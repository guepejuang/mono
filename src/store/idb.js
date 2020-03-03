const DB_NAME = 'monolit';
const DB_VERSION = 2;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
                db.createObjectStore("pinjaman", { autoIncrement: true, keyPath:'id' });
                db.createObjectStore("teman", { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deletePinjaman(pinjaman) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['pinjaman'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('pinjaman');
			store.delete(pinjaman.id);
		});	
	},
	async getPinjaman() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['pinjaman'],'readonly');
			trans.oncomplete = () => {
				resolve(pinjaman);
			};
			
			let store = trans.objectStore('pinjaman');
			let pinjaman = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					pinjaman.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async savePinjaman(pinjaman) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['pinjaman'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('pinjaman');
			store.put(pinjaman);

		});
	
    },
    async saveTeman(teman) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['teman'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('teman');
			store.put(teman);

		});
	
	},
	async getTeman() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['teman'],'readonly');
			trans.oncomplete = () => {
				resolve(teman);
			};
			
			let store = trans.objectStore('teman');
			let teman = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					teman.push(cursor.value)
					cursor.continue();
				}
			};

		});
	}

}