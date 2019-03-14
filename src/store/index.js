import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import menuList from './menuList'
import routes from './routes'
Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
	storage : window.localStorage
})

const store = new Vuex.Store({
	modules:{
		menuList,
		routes
	},
	plugins: [vuexLocal.plugin]

});

(()=>{
	store.dispatch('reAddRoutes')
})()

export default store;