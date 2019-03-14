export default(path,type)=>{
	for(var i=0;i<dtRoutes.length;i++){
		if(path == dtRoutes[i].path){
			if(type=="meta"){
				return dtRoutes[i].meta
			}else{
				return dtRoutes[i].component
			}
			
		}
	}
}
const dtRoutes=[{
	    		path : 'index',
	    		name : 'index',
	    		component : () => import('@/views/index.vue'),
	    		meta: {
			        title: '项目总览'
			    }
	    	},
	    	//项目详情
	    	{
	    		path : 'proDetail',
	    		name : 'proDetail',
	    		component : () => import('@/views/proDetail.vue'),
	    		meta: {
	    			parent:['项目总览'],
			        title: '项目详情'
			    }
	    	},
	    	//测试服务
	    	{
	    		path : 'compatible',
	    		name : 'compatible',
	    		component : () => import('@/views/compatible.vue'),
	    		meta: {
	    			parent:['测试服务'],
			        title: '兼容测试'
			    }
	    	},
	    	//测试管理
	    	{
	    		path : 'taskStatus',
	    		name : 'taskStatus',
	    		component : () => import('@/views/taskStatus.vue'),
	    		meta: {
	    			parent:['测试管理'],
			        title: '任务状态'
			    }
	    	},
	    	//管理中心
	    	{
	    		path : 'allManage',
	    		name : 'allManage',
	    		component : () => import('@/views/allManage.vue'),
	    		meta: {
	    			parent:['管理中心'],
			        title: '项目总览'
			    }
	    	},
	    	{
	    		path : 'proManage',
	    		name : 'proManage',
	    		component : () => import('@/views/proManage.vue'),
	    		meta: {
	    			parent:['管理中心'],
			        title: '项目管理'
			    }
	    	},
	    	{
	    		path : 'taskEdit',
	    		name : 'taskEdit',
	    		component : () => import('@/views/taskEdit.vue'),
	    		meta: {
	    			parent:['管理中心','项目管理'],
			        title: '任务编辑'
			    }
	    	}, 
	    	{
	    		path : 'staffManage',
	    		name : 'staffManage',
	    		component : () => import('@/views/staffManage.vue'),
	    		meta: {
			        parent:['管理中心'],
			        title: '人员管理'
			    }
	    	}]