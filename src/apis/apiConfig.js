import Axios from 'axios'
export default (url, method="GET", data, selfCb, errCb) => {
	let params = null;
	if(method == 'GET'){
		params = {...data, date: new Date().getTime()}
	}
	Axios({
	  	url,
		method,
		params,
	  	data
	}).then((response)=>{
		selfCb && selfCb(response)
	}).catch( (error)=>{
		errCb && errCb(error)
		console.log(error);
	})
}