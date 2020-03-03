<!-- =========================================================================================
    File Name: VxTimeline.vue
    Description: Timeline Component
    Component Name: VxTimeline
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <ul class="vx-timeline">
      <li v-for="(item,index) in data" :key="item.id">
          <div class="timeline-icon" :class="`bg-${item.color}`">
              <feather-icon :icon="item.icon" svgClasses="text-white stroke-current w-5 h-5" />
          </div>
          <div class="timeline-info">
              <p class="font-semibold">{{ item.title }} <small class="text-grey activity-e-time">{{ item.time }}</small></p>
              <span class="activity-desc">{{ item.desc }}</span>
          </div>
          
          <!-- <small class="text-grey activity-e-time">{{ item.lunas }}</small> -->
          <div class="btn-group mt-2">
            <vs-button @click="openConfirm(item,index)" :color="item.lunas == '0'?'warning':'primary'" type="filled" size="small" class="kudusegini">{{ item.lunas == 1? "Sudah Lunas": "Belum Lunas" }}</vs-button>
            <vs-button @click="openHapus(item,index)" color="danger" type="filled" size="small" class="kudusegini">Hapus</vs-button>
          </div>
      </li>
  </ul>
</template>

<script>
export default {
  name: "vx-timeline",
  props: {
    data: {
      type: Array,
      required: true
    },
    userinfo: {
      type: Object,
      required: true
    },
    dbUser: {
      type: Array,
      required: true
    },
  },
  data(){
    return{
      itemSelected:''
    }
  },
  methods:{
    eain(){
      // console.log("Dari timeline", "Mantap")
    },
    openConfirm(item,index){
      this.$vs.dialog({
        type:'confirm',
        color: 'primary',
        title: 'Konfirmsi Perubahan Status Pinjaman',
        text: 'Apakah Kamu yakin akan merubah status pinjaman?',
        accept:this.acceptAlert
      })

      this.itemSelected = item
      // console.log('userinfo 1',this.dbUser)
      },
      acceptAlert(){
        
        // var hutangLama = this.userinfo.hutang
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == this.itemSelected.id) {
                
                this.data[i].lunas = !this.data[i].lunas
                
                for (var i = 0; i < this.userinfo.hutang.length; i++) {
                  if (this.userinfo.hutang[i].id == this.data[i].id) {
                      this.userinfo.hutang[i].lunas = this.data[i].lunas
                      // console.log('setTo', this.data[i].lunas)
                  }
                }

                for (var i = 0; i < this.dbUser.length; i++) {
                  if (this.dbUser[i].id == this.userinfo.id) {
                      this.dbUser[i] = this.userinfo
                  }
                }
                break;
            }
        }

        // console.log('userinfo 2',this.dbUser)
        this.$store.dispatch('saveDb', this.dbUser);
        this.$vs.notify({
          color:'success',
          title:'Status Berubah',
          text:'Status Pinjaman telah diubah'
        })
      },
      openHapus(item,index){
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Konfirmsi Penghapusan Pinjaman',
        text: 'Apakah Kamu yakin akan menghapus pinjaman ini?',
        accept:this.deleteAlert
      })

      this.itemSelected = item
      console.log('userinfo 1',this.userinfo.hutang)
      },
      deleteAlert(){
        if (this.data.length > 1) {
          this.data.splice(this.itemSelected.id,1);  
        } else {
          this.data.splice(0,this.data.length);  
        }

        if (this.userinfo.hutang.length > 1) {
          this.userinfo.hutang.splice(this.itemSelected.id,1);  
        } else {
          this.userinfo.hutang.splice(0,this.userinfo.hutang.length);  
        }
        // console.log('userinfo 2',this.userinfo.hutang)
        

        
        // for (var i = 0; i < this.userinfo.hutang.length; i++) {
        //   if (this.userinfo.hutang[i].id == this.data[i].id) {
        //       this.userinfo.hutang[i].lunas = this.data[i].lunas
        //       // console.log('setTo', this.data[i].lunas)
        //   }
        // }

        for (var i = 0; i < this.dbUser.length; i++) {
          if (this.dbUser[i].id == this.userinfo.id) {
              this.dbUser[i] = this.userinfo

              break;
          }
        }

        // var hutangLama = this.userinfo.hutang
        // for (var i = 0; i < this.data.length; i++) {
        //     if (this.data[i].id == this.itemSelected.id) {
                
        //         delete this.data[i]
        //         // this.data[i].lunas = !this.data[i].lunas
                
                
        //         break;
        //     }
        //     console.log(this.data)
        // }

        console.log('userinfo 2',this.dbUser)
        this.$store.dispatch('saveDb', this.dbUser);
        this.$vs.notify({
          color:'success',
          title:'Pinjaman terhapus',
          text:'Pinjaman Telah terhapus'
        })
      }
    
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxTimeline.scss";
</style>

<style lang="css">
.kudusegini{
  padding: 7px !important;
}
</style>