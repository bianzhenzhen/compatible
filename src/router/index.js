import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
	mode:'history',
	routes:[
		{
			path : '/',
	    	redirect : '/views/index',
		},{
	    	path : '/login',
	    	name : 'login',
	    	component : () => import('@/views/login.vue'),
	    	meta: {
		        title: '登陆'
		    }
	    },{
	    	path : '/register',
	    	name : 'register',
	    	component : () => import('@/views/register.vue'),
	    	meta: {
		        title: '注册'
		    }
	    },{
	    	path : '/404',
	    	component : () => import('@/components/common/404.vue')
	    },{
	    	path : '/403',
	    	component : () => import('@/components/common/403.vue')
	    },
	    // {
	    // 	path : '*',
	    // 	redirect : '/404'
	    // }
	]
})
//全局路由卫士
router.beforeEach((to, from, next) =>{
	console.log(to,from,next)
	if(to.fullPath === '/login' || to.fullPath === '/register'){
		next()
	}else{
		if(!localStorage.getItem('token')){
			next({path:'/login'})
		}else{
			next()
		}
	}
})
router.afterEach((to, from, next)=>{
	window.scrollTo(0,0);
})

export default router;