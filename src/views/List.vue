<template>
	<div class="grid-layout-container alignment-block">
		
		<vs-row
            v-if="isHome"
			vs-align="flex-start"
			vs-type="flex" vs-justify="center" vs-w="12">
			
			<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12" class="mb-base">
                <vx-card title="Daftar Pinjaman">
				<vs-list>
                    
                    <vs-list-item
                        v-for="h in dataHutang"
                        :title="h.nama" class="kiri"
                        :key="h.id">
                        <template slot="avatar">
                        <!-- <vs-avatar /> -->
                        <vs-avatar @click="detail(h)"/>
                        
                        </template>
                    </vs-list-item>
                    
                    
                </vs-list>
                </vx-card>
			</vs-col>
		</vs-row>
        <form @submit="tambahTeman" v-if="isFriends" >
            <vs-row
                
                class="mb-base"
                vs-align="flex-start"
                vs-type="flex" vs-justify="center" vs-w="12">
                
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12" class="mb-base">
                    <vx-card title="Buat Teman Baru" >
                        <div class="vx-row">
                            <div class="vx-col w-full">
                                <vs-input required class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label-placeholder="Nama Teman" v-model="nama" />
                            </div>
                        </div>
                        <div class="vx-row mb-5">
                            <div class="vx-col w-full">
                                <vs-input required class="w-full" icon-pack="feather" icon="icon-phone" icon-no-border label-placeholder="Nomor Telepon" v-model="hp" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-textarea required label="Keterangan" v-model="info" />
                            </div>
                        </div>
                        <div class="vx-row">
                            <div class="vx-col w-full">
                            <button  class="vs-component vs-button mr-3 mb-2 vs-button-primary vs-button-filled float-right">Tambah Teman</button>
                            <!-- <vs-button color="warning" type="border" class="mb-2">Reset</vs-button> -->
                            </div>
                        </div>
                    </vx-card>
                </vs-col>
            </vs-row>
        </form>

        
        <vs-row
            v-if="isAdd" 
            class="mb-base"
            vs-align="flex-start"
            vs-type="flex" vs-justify="center" vs-w="12">
            
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12" class="mb-base">
                <vx-card title="Buat Pinjaman Baru" >
                    <div class="vx-row">
                        <div class="vx-col w-full">
                            
                            Pilih teman:
                            <v-select label="nama" :options="dataHutang" v-model="tempNama" @input="seletTeman" />
                        </div>
                    </div>
                    <div v-if="tempNama">
                        <div class="vx-row">
                            <div class="vx-col w-full mb-5">
                                <vs-input required class="w-full" icon-pack="feather" icon="icon-dollar-sign" icon-no-border label-placeholder="Jumlah pinjaman" v-model="jumlah" />
                            </div>
                        </div>
                        <div class="vx-row mb-2">
                            <div class="vx-col w-full">
                                <vs-textarea required label="Keterangan" v-model="keterangan" />
                            </div>
                        </div>
                        <vs-row>
                            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                                <button @click="terimaPinjam"  class="vs-component vs-button mr-3 mb-2 vs-button-primary vs-button-filled float-left">Terima Pinjaman</button>
                            </vs-col>
                            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
                                <button  @click="memberiPinjam" class="vs-component vs-button mr-3 mb-2 vs-button-success vs-button-filled float-right">Memberi Pinjaman</button>
                            </vs-col>
                            
                        </vs-row>
                        <div class="vx-row">
                            <div class="vx-col w-full">
                                
                                
                            <!-- <vs-button color="warning" type="border" class="mb-2">Reset</vs-button> -->
                            </div>
                        </div>
                    </div>
                    
                </vx-card>
            </vs-col>
        </vs-row>
        
        <Detail v-if="isDetailin" :user="user" :dbUser="dataHutang"/>
        <!-- Btn To Home -->
        <vs-button 
            v-if="!isHome"
            @click="toHome"
            size="large" class="back" radius color="warning" type="filled" icon-pack="feather" icon="icon-corner-up-left"></vs-button>
        
        <vs-button 
            v-if="!isButton"
            @click="toFriends"
            size="large" class="friends" radius color="warning" type="filled" icon-pack="feather" icon="icon-user-plus"></vs-button>
        <vs-button 
            v-if="!isButton"
            @click="toAdd"
            size="large" class="add" radius color="primary" type="filled" icon-pack="feather" icon="icon-edit"></vs-button>
        <vs-button 
            v-if="isButton"
            @click="isButton = !isButton"
            size="large" class="buy-now" radius color="success" type="filled" icon-pack="feather" icon="icon-plus"></vs-button>
        <vs-button 
            v-if="!isButton"
            @click="isButton = !isButton"
            size="large" class="buy-now" radius color="danger" type="filled" icon-pack="feather" icon="icon-x"></vs-button>
	</div>
</template>

<script>
import Detail from "./Detail"

export default {
    props: ['mono'],
    components:{
        Detail
    },
    data() {
        return {
            nama:'',
            hp:'',
            info:'',
            isDetailin:false,
            isAdd:false,
            isFriends:false,
            isHome:true,
            dataHutang:[],
            user:'',
            listFriends:[],
            isButton:true,
            tempNama:'',
            id:'',
            jumlah:'',
            keterangan:'',
            
        }
    },
    
    computed: {
    },
    created() {
        // console.log('mono', mono)
        this.getTeman()
    },
    methods:{
        async tambahTeman(event) {
            event.preventDefault()
            
            var lastindex = this.dataHutang.length
            console.log('lastindex',lastindex)
            if (lastindex > 0) {
                lastindex = lastindex - 1
                var lastid = this.dataHutang[lastindex].id
                lastid = lastid + 1
            } else {
                var lastid = 0
            }
            
            this.dataHutang.push({
                id:lastid,
                nama:this.nama,
                hp:this.hp,
                info:this.info,
                hutang:[]
            });

            this.nuevaTarea = '';
            this.$store.dispatch('saveDb', this.dataHutang);
            console.log('Save',this.dataHutang)

            this.nama = ''
            this.hp = ''
            this.info = ''

            
            this.getTeman()
            this.toHome()


            // this.$router.push('/');
        },
        getTeman(){
            let dataDB = JSON.parse(localStorage.getItem('cobaindah-v2'))
            if (dataDB === null) {
                this.dataHutang = [];
                this.id = 1;
            }else{
                this.dataHutang = dataDB;
                console.log(this.dataHutang)
                this.id = dataDB.length;
                
                localStorage.setItem('cobaindah-v2', JSON.stringify(this.dataHutang));
            }  
            console.log('created', this.id)
        },
        detail(h){
            this.isHome = false
            this.isFriends = false
            this.isAdd = false
            this.isDetailin=true
            this.isButton = true
            this.user = h
            // console.log('EASDA',this.user)
        },

        toAdd(){
            this.isDetailin = false
            this.isAdd = true
            this.isFriends = false
            this.isButton = true
            this.isHome = false
        },
        toDetail(){
            this.isDetailin = true
            this.isAdd = false
            this.isFriends = false
            this.isButton = true
            this.isHome = false
        },
        toFriends(){
            this.isHome = false
            this.isDetailin = false
            this.isAdd = false
            this.isFriends = true
            this.isButton = true
        },
        toHome(){
            this.isHome = true
            this.isDetailin = false
            this.isAdd = false
            this.isFriends = false
            this.isButton = true
        },
        seletTeman(v){
            console.log('teman',v)
            this.id = v.id
            
        },
        terimaPinjam(){
            this.savePinjam(1)
        },
        memberiPinjam(){
            this.savePinjam(2)
        },
        savePinjam(typein){

            var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            var bulan = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
            var tanggal = new Date().getDate();
            var xhari = new Date().getDay();
            var xbulan = new Date().getMonth();
            var xtahun = new Date().getYear();
            var hari = hari[xhari];
            var bulan = bulan[xbulan];
            var tahun = (xtahun < 1000)?xtahun + 1900 : xtahun;

            var today = hari +', ' + tanggal + ' ' + bulan + ' ' + tahun;
            for (var i = 0; i < this.dataHutang.length; i++) {
                if (this.dataHutang[i].id == this.id) {
                    
                    var lastindex = this.dataHutang[i].hutang.length
                    console.log('lastindex',lastindex)
                    if (lastindex > 0) {
                        lastindex = lastindex - 1
                        var lastid = this.dataHutang[i].hutang[lastindex].id
                        lastid = lastid + 1
                    } else {
                        var lastid = 0
                    }

                    console.log('idin', lastid)
                    this.dataHutang[i].hutang.push({
                        id:lastid,
                        jumlah:this.jumlah,
                        keterangan:this.keterangan,
                        tgl:today,
                        type:typein,
                        lunas:0
                    });
                    console.log('ini', this.dataHutang[i])
                    this.$store.dispatch('saveDb', this.dataHutang);

                    break;
                }
            }

            this.toHome()
            // let idin = ++this.id
            

            // this.nuevaTarea = '';
            // this.$store.dispatch('saveTeman', this.dataHutang);
            // console.log('Save',this.dataHutang)

            // this.nama = ''
            // this.hp = ''
            // this.info = ''

            
            // this.getTeman()
            // this.isAdd =false
        }
        
    }
}
</script>

<style lang="scss">
.list-titles{
    padding-left: 10px !important;
}
.buy-now{
        position: fixed;
        bottom: 25px;
        right: 15px;
        z-index: 51000;
        width: 64px !important;
		height: 64px !important;
    }
.back{
        position: fixed;
        bottom: 25px;
        left: 15px;
        z-index: 51000;
        width: 64px !important;
		height: 64px !important;
}
.friends{
    position: fixed;
    bottom: 75px;
    right: 15px;
    z-index: 51000;
    width: 64px !important;
    height: 64px !important;
}
.add{
    position: fixed;
    bottom: 125px;
    right: 15px;
    z-index: 51000;
    width: 64px !important;
    height: 64px !important;
}
</style>