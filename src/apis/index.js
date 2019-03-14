import axios from './apiConfig'
const proxy1 = '/api'

export const userRegister = (data,selfCb,errCb)=>axios(proxy1+'/user/registerAccount', "POST", data, selfCb, errCb)
export const userLogin = (data,selfCb,errCb)=>axios(proxy1+'/user/login', "POST", data, selfCb, errCb)
export const getMenuList = (data,selfCb)=>axios(proxy1+'/catalog/initCatalog', "GET", data, selfCb)
export const addProject = (data,selfCb,errCb)=>axios(proxy1+'/project/addProject', "POST", data, selfCb, errCb)
export const getTestReport = (data,selfCb,errCb) => axios(proxy1+'/task/getTestReport', "GET", data, selfCb)
export const downloadFile = (data,selfCb,errCb) => axios(proxy1+'/file/downloadFile', "GET", data, selfCb)
export const getProjectReport = (data,selfCb,errCb) => axios(proxy1+'/project/getTestReport', "GET", data, selfCb)
export const getUserInfo = (data,selfCb,errCb) => axios(proxy1+'/user/getUserListLikeName', undefined, data, selfCb)
export const deleteUser = (data,selfCb,errCb) => axios(proxy1+'/user/deleteUserById', undefined, data, selfCb)
export const updateUser = (data,selfCb,errCb) => axios(proxy1+'/user/updateUser', 'POST', data, selfCb)
export const getSupplierList = (data,selfCb,errCb) => axios(proxy1+'/supplier/getSupplierList', "GET", data, selfCb)
