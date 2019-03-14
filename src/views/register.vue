<template>
	<div class="page-all-frame">
		<div class="form-position">
			<div class="form-frame">
				<el-form :model="loginForm" :rules="rules" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
				  <div class="form-title">用户注册</div>
				  <el-form-item label="账号" prop="name" >
				    <el-input v-model="loginForm.name" maxlength=24 placeholder="用户名称长度必须小于24"></el-input>
				  </el-form-item>
				  <el-form-item label="密码" prop="password" >
				    <el-input v-model="loginForm.password" type="password"  minlength=6 maxlength=12 
				    placeholder="密码长度为6到12"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="rePassword" >
				    <el-input v-model="loginForm.rePassword" type="password"  minlength=6 maxlength=12
				    placeholder="密码长度为6到12"
				    ></el-input>
				  </el-form-item>
				  <div class="form-button">
				    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </div>
				  <div class="form-link">
				    <router-link to="/login">已注册立即登录</router-link>
				  </div>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {userRegister} from '@/apis'
export default {
	name:'login',
	data(){
		const validPssword = (rule, value, callback) => {
			const formatValue = value.trim();
			if(!formatValue) return callback(new Error('请填写密码!'))
			if(!/^[a-zA-Z0-9]+$/.test(formatValue)) return callback(new Error('必须填写数字，字母；且区分大小写!'))
			if(formatValue.length<6 && formatValue.length>0 ) return callback(new Error('密码必须6到12位!'))
			callback();
		};
		const validRePassword = (rule, value, callback) => {
			const formatValue = value.trim();
			if(!formatValue) return callback(new Error('请填写确认密码!'))
			if(!/^[a-zA-Z0-9]+$/.test(formatValue)) return callback(new Error('必须填写数字，字母；且区分大小写!'));
			if(formatValue.length<6 && formatValue.length>0 ) return callback(new Error('密码必须6到12位!'))
			callback();
		};
		return{
			ajaxing: false,
			loginForm : {
				name: '',
				password : '',
				rePassword : ''
			},
			rules:{
				name:[
					{required:true,message:'请填写名称',trigger:'blur'}
				],
				password:[
					{required:true,message:'请填写密码', trigger:'blur'},
					{validator:validPssword, trigger:'blur'}
				],
				rePassword:[
					{required:true,message:'请填确认密码',trigger:'blur'},
					{validator:validRePassword, trigger:'blur'}
				]
			},
			currPassword:''
		}
	},
	methods:{
		dataFormat({name, password}){
			return {
				accountName : name,
				password
			}
		},
		submitForm(refName){
			let bool = false;
			this.$refs[refName].validate( (valid, obj) => { //检验未blur
				bool = valid;
			})
			if(this.loginForm.password !== this.loginForm.rePassword) {
				this.$message.error("确认密码不正确！");
				return
			}
			const data = this.dataFormat(this.loginForm)
			if(bool && !this.ajaxing){
				this.ajaxing = true;
				userRegister(data, (res)=>{
					this.ajaxing = false;
					const {status, data} = res.data;
					if(!status){
						this.$message.success(data)
						setTimeout(()=>{
							this.$router.push("/login");
						},2000)
					}else{
						this.$message.error(data)
					}
				},(error)=>{
					this.ajaxing = false;
				})
			}
		},
		resetForm(refName){
			this.$refs[refName].resetFields();
		},
		mounted(){
			// document.onkeydown = (event) => {
			// 	var e = event || window.event || arguments.callee.caller.arguments[0];
			// 	if(e && e.keyCode == 13 && this.$route.path == '/register') this.submitForm('ruleForm');
			// }
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
			font-size:14px;
			color:blue
		}
	}
	
}
</style>