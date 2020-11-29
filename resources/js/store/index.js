import Vue from 'vue'
import Vuex from 'vuex'
import testCreator from "./modules/testCreator";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        testCreator
    }
})
