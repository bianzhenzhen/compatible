// 公共方法 
export default function(Vue, options){
	var Common = Vue.prototype.$common = {};
	// 写入localStorage
	Common.setLocalStorage = function(key, value){
		if(typeof value == 'string'){
			localStorage.setItem(key, value)
		}else{
			localStorage.setItem(key, JSON.stringify(value))
		}
	}
	//读取项
	Common.getLocalStorage = function(key,isObject=false){
		var value = localStorage.getItem(key);
		if(!isObject){
			return value
		}else{
			return JSON.parse(value)
		}
	}
	//删除项
	Common.removeLocalStorage = function(key){
		localStorage.removeItem(key)
	}
}