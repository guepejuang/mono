/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import idb from './idb';

const actions = {

    // /////////////////////////////////////////////
    // COMPONENTS
    // /////////////////////////////////////////////

    // Vertical NavMenu
    updateVerticalNavMenuWidth({ commit }, width) {
      commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
    },

    // VxAutoSuggest
    updateStarredPage({ commit }, payload) {
      commit('UPDATE_STARRED_PAGE', payload)
    },

    // The Navbar
    arrangeStarredPagesLimited({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_LIMITED', list)
    },
    arrangeStarredPagesMore({ commit }, list) {
      commit('ARRANGE_STARRED_PAGES_MORE', list)
    },

    // /////////////////////////////////////////////
    // UI
    // /////////////////////////////////////////////

    toggleContentOverlay({ commit }) {
      commit('TOGGLE_CONTENT_OVERLAY')
    },
    updateTheme({ commit }, val) {
      commit('UPDATE_THEME', val)
    },

    // /////////////////////////////////////////////
    // User/Account
    // /////////////////////////////////////////////

    updateUserInfo({ commit }, payload) {
      commit('UPDATE_USER_INFO', payload)
    },

    // /////////////////////////////////////////////
    // IDB
    // /////////////////////////////////////////////
    deletePinjaman({ commit }, {context, pinjaman}) {
      
      commit('deletePinjaman', {context, pinjaman})
    },
    getPinjaman({ commit }, context) {
      commit('getPinjaman', context)
      
    },
    savePinjaman({ commit }, pinjaman) {
      // await idb.savePinjaman(pinjaman);
      commit('savePinjaman', pinjaman)
    },
    
    saveDb({ commit }, teman) {
      // await idb.saveTeman(teman);
      // commit('saveTeman', teman)
      localStorage.setItem('cobaindah-v2', JSON.stringify(teman));
    },
    async getTeman(context) {
      context.state.teman = [];
      let cats = await idb.getTeman();
      cats.forEach(c => {
        context.state.teman.push(c);
      });
    },
    agregarTarea({ commit }, tareas) {
      // commit('agregarTarea', tareas)
      // console.log('actions', tareas)
      localStorage.setItem('cobaindah', JSON.stringify(tareas));
    },
    editarTarea: function (index) {
        this.tareas[index].estado = true;
        localStorage.setItem('cobaindah', JSON.stringify(this.tareas));
    },
    eliminarTarea: function (index) {
        this.tareas.splice(index, 1);
        localStorage.setItem('cobaindah', JSON.stringify(this.tareas));
    }
}

export default actions
