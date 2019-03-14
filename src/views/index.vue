<template>
	<div class="wrap">
		<div class="project-new fl clearfix" @click="newProject">
			<i class="el-icon-circle-plus-outline project-icon"></i>
			<span class="new">新建项目</span>
		</div>
		<div class="project-item fl clearfix" v-for="(item,index) in project" :key="index">
			<i class="el-icon-circle-close icon" v-if="isManager" @click="delProject(index)"></i>
	<!-- 		<router-link tag="span" :to="{name:'proDetail',params:{objectId:item.id}}" class="item">{{item.name}}</router-link> -->
			<span class="item" @click="goProDetail(item.id)">{{item.name}}</span>
		</div>

		<!-- dialog -->
		<el-dialog
		  :visible.sync="diaVisible"
		  width="50%"
		  center>
		  <span slot="title" class="dialog-title">
		  	<div>新建项目</div>
		  	<div>创建人：{{accountName}}</div>
		  </span>
		  <div>
		  	<el-form ref="form" :model="form" label-width="110px" :rules="rules">
			  <el-form-item label="项目名称：" prop="name">
			    <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
			  </el-form-item>
			  <el-form-item label="下载地址：" prop="downloadUrl">
			    <el-input v-model="form.downloadUrl" placeholder="请输入下载地址名称"></el-input>
			  </el-form-item>
			  <el-form-item label="平台类型：" prop="type">
			    <el-select v-model="form.type" placeholder="请选择平台类型">
			      <el-option label="手机" value="1"></el-option>
			      <el-option label="PAD" value="2"></el-option>
			      <el-option label="H5" value="3"></el-option>
			      <el-option label="微信" value="4"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="项目经理：" prop="projectManager">
			    <el-input v-model="form.projectManager" placeholder="请输入项目经理"></el-input>
			  </el-form-item>
			  <el-form-item label="测试经理：" prop="testManager">
			    <el-input v-model="form.testManager" placeholder="请输入测试经理"></el-input>
			  </el-form-item>
			</el-form>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="diaSure">确 定</el-button>
		    <el-button @click="diaVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
const form = {
	name:'',
	downloadUrl:'',
	type:'',
	projectManager:'',
	testManager:''
}
import {getProjectReport}  from '@/apis'
export default{
	name:'index',
	data(){
		return{
			diaVisible:false,
			project:[],
			form:{...form},
			rules:{
				name:{required:true,message:'必填'},
				downloadUrl:{required:true,message:'必填'},
				type:{required:true,message:'必填'},
				projectManager:{required:true,message:'必填'},
				testManager:{required:true,message:'必填'}
			}
		}
	},
	methods:{
		goProDetail(id){
			getProjectReport({id:id},(res)=>{
				console.log(res.data.status)
				if(res.data.status == 0){
					this.$router.push({name:'proDetail',params:{objectId:id}})
				}
			},(err)=>{})
		},
		newProject(){
			this.form = {...form};
			this.diaVisible = true;
			if(this.$refs.hasOwnProperty("form")){
				this.$refs.form.resetFields();
			}
			//test
		},
		delProject(index){
			const projectId = this.project[index].id;
			this.$axios.post('/api/project/deleteProject',{id:projectId})
			.then((res)=>{
				const {status, data}= res.data;
				if(!status){
					// this.getProjectList();
					this.$message.success(data);
					this.project.splice(index,1);
				}
			})
		},
		diaSure(){
			this.$refs.form.validate( (valid, obj) => {
				if(valid){
					this.$axios.post('/api/project/addProject',this.form)
					.then((res)=>{
						const {status, data} = res.data;
						if(!status){
							this.$message.success(data);
							this.getProjectList();
							this.diaVisible = false;
						}
					})
					.catch((err)=>{
						console.log(err);
					})
				}
			})
			
		},
		getProjectList(id){
			const userId = this.$common.getLocalStorage("user",true).id;
			this.$axios.post('/api/project/selectProject', {userId})
			.then((res)=>{
				const {status, data} = res.data;
				if(!status){
					this.project=[...data];
				}
			})
		}
	},
	computed:{
		accountName(){
			return this.$common.getLocalStorage('user',true).accountName;
		},
		isManager(){ //是否管理员
			return this.$common.getLocalStorage('roles',true).includes("1");
		}
	},
	mounted(){
		this.getProjectList();
	}
}
</script>
<style lang="scss" scoped>
.fl{
	float:left;
}
// .clearfix{
// 	zoom:1;
// 	&:after{
// 		content:'';
// 		height:0;
// 		line-height:0;
// 		display:block;
// 		visibility:hidden;
// 		clear:both;
// 	}　
// }　　　
.span-font{
	font-size: 20px;
    color:gray;
}
.wrap{
	color:gray;
	.project-new,.project-item{
		word-break: break-word;
		width: 200px;
	    height: 119px;
	    border-radius: 22px;
	    border: 2px solid rgb(192,192,192);
	    position:relative;
	    display: inline-block;
    	margin: 25px;
	    .project-icon{
		    position: absolute;
		    font-size: 46px;
		    top: 27px;
		    left: 77px;
		    cursor: pointer;
	    }
	    .new{
	    	position: absolute;
    		@extend .span-font;
    		bottom: 15px;
    		left: 63px;
	    }
	}
	.project-item{
		display:table;
		.item{
			display:table-cell;
    		@extend .span-font;
    		vertical-align: middle;	
    		cursor: pointer;
		}
		.icon{
		    position: absolute;
		    right: -10px;
		    font-size: 25px;
		    top: -12px;
		    color: red;
		    cursor: pointer;
		}
	}
}
.dialog-title{
	text-align:left;
}

</style>