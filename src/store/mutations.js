/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import idb from './idb';

const mutations = {


  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu

  TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(state, value) {
    state.isVerticalNavMenuActive = value
  },
  TOGGLE_REDUCE_BUTTON(state, val) {
    state.reduceButton = val
  },
  UPDATE_MAIN_LAYOUT_TYPE(state, val) {
    state.mainLayoutType = val
  },
  UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN(state, val) {
    state.verticalNavMenuItemsMin = val
  },
  UPDATE_VERTICAL_NAV_MENU_WIDTH(state, width) {
    state.verticalNavMenuWidth = width
  },


  // VxAutoSuggest

  UPDATE_STARRED_PAGE(state, payload) {

    // find item index in search list state
    const index = state.navbarSearchAndPinList["pages"].data.findIndex((item) => item.url == payload.url)

    // update the main list
    state.navbarSearchAndPinList["pages"].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      state.starredPages.push(state.navbarSearchAndPinList["pages"].data[index])
    }
    else {
      // find item index from starred pages
      const index = state.starredPages.findIndex((item) => item.url == payload.url)

      // remove item using index
      state.starredPages.splice(index, 1)
    }
  },

  // Navbar-Vertical

  ARRANGE_STARRED_PAGES_LIMITED(state, list) {
    const starredPagesMore = state.starredPages.slice(10)
    state.starredPages     = list.concat(starredPagesMore)
  },
  ARRANGE_STARRED_PAGES_MORE(state, list) {
    let downToUp                 = false
    let lastItemInStarredLimited = state.starredPages[10]
    const starredPagesLimited    = state.starredPages.slice(0, 10)
    state.starredPages           = starredPagesLimited.concat(list)

    state.starredPages.slice(0, 10).map((i) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      state.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  },


  // ////////////////////////////////////////////
  // UI
  // ////////////////////////////////////////////

  TOGGLE_CONTENT_OVERLAY(state, val) { state.bodyOverlay       = val },
  UPDATE_PRIMARY_COLOR(state, val)   { state.themePrimaryColor = val },
  UPDATE_THEME(state, val)           { state.theme             = val },
  UPDATE_WINDOW_WIDTH(state, width)  { state.windowWidth       = width },
  UPDATE_WINDOW_SCROLL_Y(state, val) { state.scrollY = val },


  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {

    // Get Data localStorage
    let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.AppActiveUser

    for (const property of Object.keys(payload)) {

      if (payload[property] != null) {
        // If some of user property is null - user default property defined in state.AppActiveUser
        state.AppActiveUser[property] = payload[property]

        // Update key in localStorage
        userInfo[property] = payload[property]
      }


    }
    // Store data in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
  },

  async deletePinjaman(context, pinjaman) {
      console.log('store is being asked to delete '+pinjaman.id);
      await idb.deletePinjaman(pinjaman); 
    },
    async getPinjaman(context) {
      context.pinjaman = [];
      // console.log(context)
      let pinjaman = await idb.getPinjaman();
      pinjaman.forEach(c => {
        context.pinjaman.push(c);
      });
    },
    async savePinjaman(context, pinjaman) {
      await idb.savePinjaman(pinjaman);
    },
    async saveTeman(context, teman) {
      await idb.saveTeman(teman);
    },
    agregarTarea(tareas) {
      // commit('agregarTarea', tareas)
      console.log('mutation', tareas)
      localStorage.setItem('cobaindah', JSON.stringify(tareas));
    },
    async getTeman(context) {
      context.teman = [];
      let cats = await idb.getTeman();
      cats.forEach(c => {
        context.teman.push(c);
      });
    }
    // async getTeman(context, datain) {
    //   console.log('datain',datain)
    //   context.teman = []
    //   const dataTeman = []

    // const temandb = await idb.getTeman();
    // for (let index = 0; index < temandb.length; index++) {
    //   dataTeman.push(temandb[index]);
    // }
    // for (let index = 0; index < dataTeman.length; index++) {
    //   context.teman.push(dataTeman[index]);
    // }
      
    //   // console.log(context)
    //   // context.teman = dataTeman
    //   console.log('type', typeof dataTeman)
    //   // let temandb = await idb.getTeman();
    //   // // // const teman = JSON.parse(JSON.stringify(temani))
      
    //   // // teman.forEach(c => {
      
    //   // //   // context.teman = c;
    //   // // });
    //   // // context.teman.push(temandb);

    //   // for (let index = 0; index < temandb.length; index++) {
    //   //   // context.teman += teman[index]
    //   //     console.log('ke-'+index, temandb[index])  
    //   //     const dataTeman = temandb[index]
    //   //     console.log('type', typeof temandb[index])
    //   //     context.teman.push(dataTeman);
    //   // }
    // },
    // 
}

export default mutations

