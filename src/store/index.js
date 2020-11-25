import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    USB: false
}
const mutations = {
    usbState(state,bool){
        state.USB = bool
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules: {}
})
