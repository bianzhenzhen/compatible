import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import './plugins/utils.js'
import router from './router'
import Axios from 'axios'
import store from './store'



Vue.prototype.$axios = Axios;
//配置axios请求头token
Axios.interceptors.request.use(

	config => {
		if(localStorage.getItem('token')){

			config.headers.Authorization = localStorage.getItem('token');
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
)
Axios.interceptors.response.use(
	response => {
		const { status, data} = response.data;
		if(status&&status == 4 ){
			vueInstance.$message.error(data);
			setTimeout(()=>{
				vueInstance.$router.push("/login")
			},2000)
		}else if(status&&status != 4 ){
			vueInstance.$message.error(data);
		}
		return response;
	},
	error => {
		return Promise.reject(error);
	}
)


Vue.config.productionTip = false

const vueInstance = new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app');
