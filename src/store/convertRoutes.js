import lazy from './lazy'
export default(routeList, menuList)=>{
	toRoutes(routeList, menuList)

}
function toRoutes(routeList, menuList){
	if(menuList && menuList.length){
		for(var i=0;i<menuList.length;i++){
			var menuItem = menuList[i];
			var path = menuItem.path;
			if(menuItem.type){
				var routeNode = {
					path : path,
		    		name : path,
		    		component : lazy(path,"component"),
		    		meta: lazy(path,"meta"),
				    children:[]
				}
				routeList.push(routeNode);
				if(menuItem.children&&menuItem.children.length){
					toRoutes(routeList, menuItem.children)
				}
			}else{
				if(menuItem.children&&menuItem.children.length){
					toRoutes(routeList, menuItem.children)
				}
				
			}
			
		}
	}

}