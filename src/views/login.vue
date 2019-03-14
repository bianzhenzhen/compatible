<template>
	<div class="page-all-frame">
		<div class="form-position">
			<div class="form-frame">
				<el-form :model="loginForm" :rules="rules" status-icon ref="ruleForm" label-width="70px" class="demo-ruleForm">
				  <div class="form-title">兼容性测试平台</div>
				  <el-form-item label="账号" prop="name">
				    <el-input v-model="loginForm.name"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password">
				    <el-input v-model="loginForm.password" type="password"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码" prop="validateCode" class="self-form-item">
				    <el-input v-model="loginForm.validateCode"></el-input>
				    <validate-code @show-code="showCode" ref="validateCode"/>
				  </el-form-item>
				  <div class="form-button">
				    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </div>
				  <div class="form-link">
				    <router-link to="/register">立刻注册</router-link>
				  </div>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import validateCode from '@/components/common/validateCode'
import {userLogin, getMenuList} from '@/apis'
import menuList from '@/store/selfmenu'
export default {
	name:'login',
	components:{validateCode},
	data(){
		const validPssword = (rule, value, callback) => {
			const formatValue = value.trim();
			if(!formatValue) return callback(new Error('请填写密码!'))
			if(!/^[a-zA-Z0-9]+$/.test(formatValue)) return callback(new Error('必须填写数字，字母；且区分大小写!'));
			callback();
		};
		const validCode = (rule, value, callback) => {
			const formatValue = value.trim();
			if(!formatValue) return callback(new Error('请填写验证码!'))
			if(!/^[a-zA-Z0-9]+$/.test(formatValue)) return callback(new Error('必须填写数字，字母!'));
			if(this.currRightCode && formatValue.toLowerCase() !== this.currRightCode.toLowerCase() ) return callback(new Error('验证码错误！'));
			callback();
		};
		return{
			ajaxing: false,
			loginForm : {
				name: '',
				password : '',
				validateCode : ''
			},
			rules:{
				name:[
					{required:true,message:'请填写名称',trigger:'blur'}
				],
				password:[
					{required:true,message:'请填写密码', trigger:'blur'},
					{validator:validPssword, trigger:'blur'}
				],
				validateCode:[
					{required:true,message:'请填写验证码',trigger:'blur'},
					{validator:validCode, trigger:'blur'}
				]
			},
			currRightCode:''
		}
	},
	methods:{
		dataFormat(data){
			return {
				accountName : data.name,
				password : data.password
			}
		},
		submitForm(refName){
			const {managerList,ordinaryList} = menuList;
			//test
			// this.$store.dispatch('addMenu',managerList||[]);//格式化菜单
			// this.$store.dispatch('AddRoutes',managerList);//添加路由
			// this.$router.push("/");
			//test
			let bool = false;
			this.$refs[refName].validate( (valid, obj) => { //检验未blur
				bool = valid;
			})
			if(bool && !this.ajaxing){
				this.ajaxing = true;
				const data = this.dataFormat(this.loginForm);
				userLogin(data, (res)=>{
					this.ajaxing = false
					const {status, data} = res.data;
					if(!status){
						this.$common.setLocalStorage('token',data.token);
						this.$common.setLocalStorage('roles',data.roles);
						this.$common.setLocalStorage('user',data.user);
						//
						let menuListSelf = [];
						menuListSelf = data.roles.includes("1")?managerList:ordinaryList;
						//侧边栏
						getMenuList({id:data.user.id},(res)=>{
							const menuList = res.data.data;
							this.$store.dispatch('addMenu',menuListSelf||[]);//格式化菜单
							this.$store.dispatch('AddRoutes',menuListSelf);//添加路由
							this.$router.push("/");
						})
					}
				},(err)=>{
					this.ajaxing = false
				})
			}
		},
		resetForm(refName){
			this.$refs[refName].resetFields();
			this.refreshCode();
		},
		refreshCode(){//提高性能
			window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				requestAnimationFrame(this.$refs.validateCode.drawPic)
		},
		showCode(code){
			console.log(code,"code")
			this.currRightCode = code;
		}
	},
	mounted(){
		this.refreshCode();
		document.onkeydown = (event) => {
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode == 13 && this.$route.path == '/login' ) this.submitForm('ruleForm');
		}
		
	}
}
</script>
<style lang="scss" scoped>
.page-all-frame{
	min-height:100%; //方便铺背景
	display:table;
	width:100%;
	background: rgb(64, 64, 64);
	.form-position{
		display:table-cell;
		vertical-align: middle;
		text-align:center;
		.form-frame{
			background: white;
			border:#363636 solid blue;
			border-radius: 20px;
			width:40%;
			margin: 0 auto;
    		padding: 4% 5% 2%;
		}
		.form-title{
			font-size: 32px;
    		padding-bottom: 35px;
		}
		.form-button>.el-button{
		        width: 43%;
    			margin: 20px 10px;
		}
		.form-button>.el-button:first-child{
    			margin-left: 0;
		}
		.form-button>.el-button:last-child{
    			margin-right: 0;
		}
		.form-link{
			text-align: right;
		}
		.form-link>a{
			text-align: right;
			font-size:14px;
			color:blue
		}
	}
	.self-form-item{
		.el-input{
			width: 45%;
	    	float: left;
		}
		.canvas-style{
			float: right;
		}
	}
	
}
</style>