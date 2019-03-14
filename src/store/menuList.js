import menuPath from './routes'
export default{
	state:{
		menuList:[]
	},
	actions:{
		addMenu({commit}, menuParam){
			commit('addMenu', menuParam)
		}
	},
	mutations:{
		addMenu(state, menuParam){
			if(menuParam){
				var arr = [];
				_addMenu(arr,menuParam);
				state.menuList = arr;
				// console.log(state.menuList,"state.menuList")
			}
			 function _addMenu(menuList, menuParam){
			 	for(var i=0; i<menuParam.length; i++){
			 		var item = menuParam[i]
			 		if(!item.isShow) continue
			 		var menu = {
			 			icon : '',
			 			index: 'path',
			 			title: '工作台',
			 			subs:[]
			 		}
			 		menu.icon = item.icon;
			 		menu.index = item.path;
			 		menu.title = item.name;
			 		menu.type = item.type;
			 		if(item.children && item.children.length){
			 			_addMenu(menu.subs,item.children)
			 		}
			 		menuList.push(menu)
			 	}
			 }
		}
	}
}