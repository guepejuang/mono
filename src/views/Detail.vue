<template>
	<div class="grid-layout-container alignment-block">
		<center class="mb-base">
			<vs-avatar size="70px" src="https://i.imgur.com/ezM6SJ5.png"/>
			<h1>{{user.nama}}</h1>
			<h4>{{user.info}}</h4>
			
		</center>
		
		<vs-row
			vs-align="flex-start"
			vs-type="flex" vs-justify="center" vs-w="12">
			
			<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12" class="mb-base">
				<div class="vx-col w-full mb-base">
					<vx-card title="Activity Timeline">
						<vx-timeline :data="timelineData" :userinfo="user" :dbUser="dbUser" />
					</vx-card>
				</div>
			</vs-col>
		</vs-row>
	</div>
</template>

<script>
import VxTimeline from "@/components/timeline/VxTimeline"
export default {
	
	props: ['user', 'dbUser'],
	name:'Detail',
	
	data() {
        return {
			timelineData: [
            
            ],
		}
	},
    components: {
        VxTimeline
	},
	created(){
		
		let hutang = this.user.hutang;
		var id = 0
		console.log('detail', this.user.hutang)
		for (var i = 0; i < hutang.length; i++) {
			
				

				if (hutang[i].type === 1) {
					var colorin = "danger"
					var iconin = "ArrowDownRightIcon"
					console.log('detail'+i, hutang[i].type)
				}

				if (hutang[i].type === 2) {
					var colorin = "success"
					var iconin = "ArrowUpRightIcon"
				}

				

				this.timelineData.push({
					id:id,
					userid:this.user.id,
					color: colorin,
					icon: iconin,
					title: "Rp. "+hutang[i].jumlah,
					desc: hutang[i].keterangan,
					time: hutang[i].tgl,
					lunas: hutang[i].lunas
				});

				++id
				// console.log('ini', this.dataHutang[i])
				// this.$store.dispatch('saveDb', this.dataHutang);
				
			
		}
	}
}
</script>

<style  scoped>
.hijau{
	margin-right: 16px;
	border-radius: .5rem .5rem .5rem 0;
}
.merah{
	margin-left: 16px;
	border-radius: .5rem .5rem 0 .5rem;
}
</style>