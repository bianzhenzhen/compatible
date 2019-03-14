import convertRoutes from './convertRoutes'
import router from '@/router'
export default{
state:{
	rootRoute:[],
	routeParam:[]  //持久化存放，刷新时用
},
actions: {
	reAddRoutes({commit}){
		commit('reAddRoutes')
	},
	AddRoutes({commit},menuList){
		commit('AddRoutes',menuList)
	}
},
mutations:{
	reAddRoutes(state){
		this.commit('AddRoutes',state.routeParam)
	},
	AddRoutes(state,menuList){
		let routeList = [];
	    convertRoutes(routeList, menuList)
		let rootRoute =[{
	        path : '/views',
	    	name : 'views',
	    	component : () => import('@/components/layout.vue'),
	        meta: { title: '自述文件' },
	        children:routeList
	      }]
	     state.rootRoute = rootRoute;
	     state.routeParam = menuList;
	     //动态添加路由
	     router.addRoutes(rootRoute);
		 console.log('输出路由:',rootRoute);
	}
}
}