<template>
	<div class="grid-layout-container alignment-block">
		
		<vs-row
            class="mb-base"
			vs-align="flex-start"
			vs-type="flex" vs-justify="center">
			
			<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12">
                <vx-card title="Pilih Teman">
				<vs-list>
                    <router-link to="/detail">
                    <vs-list-item title="Ujang" class="kiri">
                        <template slot="avatar">
                        <!-- <vs-avatar /> -->
                        <vs-avatar src="https://i.imgur.com/ezM6SJ5.png"/>
                        </template>
                    </vs-list-item>
                    </router-link>
                    <vs-list-item title="Steve Jobes" class="kiri">
                        <template slot="avatar">
                        <vs-avatar />
                        </template>
                    </vs-list-item>
                    <vs-list-item title="Steve Jobes" class="kiri">
                        <template slot="avatar">
                        <vs-avatar />
                        </template>
                    </vs-list-item>
                    <vs-list-item title="Steve Jobes" class="kiri">
                        <template slot="avatar">
                        <vs-avatar />
                        </template>
                    </vs-list-item>
                </vs-list>
                </vx-card>
			</vs-col>
		</vs-row>

        <vs-row
            class="mb-base"
			vs-align="flex-start"
			vs-type="flex" vs-justify="center" vs-w="12">
			
			<vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="10" vs-xs="12" class="mb-base">
                <vx-card title="Buat Pinjaman" >
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <vs-input class="w-full" icon-pack="feather" icon="icon-dollar-sign" icon-no-border label-placeholder="Jumlah Pinjaman" />
                        </div>
                    </div>
                    <div class="vx-row mb-2">
                        <div class="vx-col w-full">
                            <vs-textarea label="Keterangan" />
                        </div>
                    </div>
                    <div class="vx-row">
                        <div class="vx-col w-full">
                        <vs-button class="mr-3 mb-2">Submit</vs-button>
                        <vs-button color="warning" type="border" class="mb-2">Reset</vs-button>
                        </div>
                    </div>
                </vx-card>
			</vs-col>
        </vs-row>
        

	</div>
</template>

<style lang="scss">
.vs-list--title{
    padding-left: 10px !important;
}
</style>