<template>
<div>
<div class="vx-row"> 
	<div class="vx-col w-full lg:w-1/2 mb-base">
	<input type="text" class="form-control my-3" v-model="nuevaTarea" v-on:keyup.enter="agregarTarea">
        <button type="submit" class="btn btn-primary" @click='agregarTarea'> Agregar</button>
		<ol>
			<!-- {{mono}} -->
			<li v-for="ta in mono">
				{{ta.nama}}
			</li>
		</ol>
	<vx-card slot="no-body" class="text-center bg-success-gradient greet-user">
				<!-- <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
				<img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175"> -->
		<feather-icon icon="ArrowUpRightIcon" class="p-6 mb-8 bg-success inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
		<h1 class="mb-6 text-white">+Rp. 100.000 ,</h1>
		<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">Berhasil kamu berikan kepada 5 Teman kamu <strong></strong> Berbuat baiklah selagi bisa.</p>
	</vx-card>
	
	</div>
	<div class="vx-col w-full lg:w-1/2 mb-base">
	<vx-card slot="no-body" class="text-center bg-danger-gradient greet-user">
				<!-- <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
				<img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175"> -->
		<feather-icon icon="ArrowDownRightIcon" class="p-6 mb-8 bg-danger inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
		<h1 class="mb-6 text-white">-Rp. 100.000,</h1>
		<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">Berhutang kepada 5 Orang <strong></strong>Bayarlah sebelum ditagih, berbahagialah sebelum </p>
	</vx-card>
	</div>
</div>

<div class="vx-row">
	<div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
		<vx-card title="Transaksi Terakhir" refresh-content-action @refresh="closeCardAnimationDemo">
			<vs-list>
				<vs-list-item icon-pack="feather" icon="icon-arrow-up-right" title="+Rp.20.000">
					<!-- <vs-button color="warning" type="filled" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button> -->
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-down-right" title="-Rp.10.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-down-right" title="-Rp.10.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-down-right" title="-Rp.10.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-up-right" title="+Rp.20.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-up-right" title="+Rp.20.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-down-right" title="-Rp.10.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
				<vs-list-item icon-pack="feather" icon="icon-arrow-up-right" title="+Rp.20.000">
					<vs-button color="dark" type="line" icon-pack="feather" icon="icon-arrow-right-circle"></vs-button>
				</vs-list-item>
			</vs-list>
		</vx-card>
	</div>

	<div class="vx-col w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
		<vx-card 
			title-color="#fff"
			content-color="#fff"
			card-background="linear-gradient(to right, #56ab2f, #a8e063)"
			title="Catatan" 
			refresh-content-action 
			class="text-center"
			@refresh="closeCardAnimationDemo">
				<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">Jangan terlalu sering beri pinjaman, nanti buat jajan gak ada</p>
		</vx-card>
	</div>

	<!-- <vs-button color="danger" type="filled" class="buy-now" target :href="{url: 'https://1.envato.market/vuexy_admin'}">Buy Now</vs-button> -->
	<vs-button size="large" class="buy-now" radius color="primary" type="filled" icon-pack="feather" icon="icon-plus"></vs-button>
</div>

</div>
</template>
<style lang="scss">
    .buy-now{
        position: fixed;
        bottom: 5%;
        right: 15px;
        z-index: 51000;
        width: 64px !important;
		height: 64px !important;
    }
</style>
<script>
export default {
	props: ['mono'],
	data() {
        return{
			titulo: 'GYM con Vue',
        tareas: [],
        nuevaTarea: ''
		}

    },
  methods: {
	agregarTarea: function () {
		this.tareas.push({
			nombre: this.nuevaTarea,
			estado: false
		});

		this.nuevaTarea = '';
		this.$store.dispatch('agregarTarea', this.tareas);
		console.log(this.tareas)
	},
    closeCardAnimationDemo(card) {
      card.removeRefreshAnimation(3000);
    }
  },
  created(){
	//   alert(this.mono.nama)
	let datosDB = JSON.parse(localStorage.getItem('cobaindah'))
	if (datosDB === null) {
		this.tareas = [];
	}else{
		this.tareas = datosDB;
		localStorage.setItem('cobaindah', JSON.stringify(this.tareas));
	}  
  }
}
</script>