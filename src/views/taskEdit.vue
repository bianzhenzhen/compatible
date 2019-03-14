<template>
	<div class="wrap">
		<el-form ref="form" :model="form" label-width="140px" :rules="rules">
		 <el-form-item label="项目名称：" prop="name">
		    <el-input v-model="form.project.name" placeholder="请输入项目名称"></el-input>
		  </el-form-item>
		  <el-form-item label="下载地址：" prop="downloadUrl">
		    <el-input v-model="form.project.downloadUrl" placeholder="请输入下载地址名称"></el-input>
		  </el-form-item>
		  <el-form-item label="平台类型：" prop="type">
		    <el-select v-model="form.project.type" placeholder="请选择平台类型">
		      <el-option label="手机" value="1"></el-option>
		      <el-option label="PAD" value="2"></el-option>
		      <el-option label="H5" value="3"></el-option>
		      <el-option label="微信" value="4"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="项目经理：" prop="projectManager">
		    <el-input v-model="form.project.projectManager" placeholder="请输入项目经理"></el-input>
		  </el-form-item>
		  <el-form-item label="测试经理：" prop="testManager">
		    <el-input v-model="form.project.testManager" placeholder="请输入测试经理"></el-input>
		  </el-form-item>
		  <el-form-item label="系统选择">
		    <el-checkbox-group v-model="form.task.systemList">
		      <el-checkbox :label="item.text" name="systemList" v-for="item in system" :key="item.index"></el-checkbox>
		    </el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="版本" prop="version">
		    <el-input v-model="form.task.version" placeholder="请填写版本"></el-input>
		  </el-form-item>
		  <el-form-item label="测试用例选择">
		    <el-upload
			  class="upload-demo"
			  action="/api/file/upload"
			  multiple
			  :limit="1"
			  :on-exceed="exceed"
			  :on-success="success"
			  :on-remove="remove"
			  :file-list="form.task.uploadFile">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传一个文件，且不超过20M</div>
			</el-upload>
			<div class="care">*注：标准兼容性测试用例默认覆盖各1,2级页面，如有特殊需求请上传用例，如果没有请选择无</div>
		  </el-form-item>
		  <el-form-item label="测试账号是否互踢">
		    <el-select v-model="form.task.kick" placeholder="请选择">
		      <el-option label="是" value="1"></el-option>
		      <el-option label="否" value="2"></el-option>
		    </el-select>
		    <div class="care">*注：如果账号存在互踢，请至少准备30个账号随测试用例上传</div>
		  </el-form-item>
		  <el-form-item label="报告接收邮箱" prop="receiveMail">
		    <el-input v-model="form.task.receiveMail"></el-input>
		  </el-form-item>
		  <el-form-item label="机型备注">
		    <el-input v-model="form.task.modelsRemark" placeholder="默认IOS TOP50  安卓TOP250"></el-input>
		  </el-form-item>
		  <el-form-item label="供应商选择：" prop="toEmail">
		    <el-select v-model="form.toEmail" placeholder="请选择供应商">
		     <el-option
		      v-for="item in emails"
		      :key="item.id"
		      :label="item.name"
		      :value="item.email">
		    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit" v-if="isEdit">通过</el-button>
		    <el-button @click="cancel">取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
const form = {
	project:{
		id:'',
		name:'',
		downloadUrl:'',
		type:'',
		projectManager:'',
		testManager:'',
	},
	task:{
		id:"",  
		catalogId:"",  
		projectId:"", 
		systemList:[], //提交时 system 字符
		version:"", 
		uploadFile:[],  //提交时 testCase
		kick:"",  
		receiveMail:"",  
		modelsRemark:"",  
	},
	audit:true,
	toEmail:''
}
import {getSupplierList} from '@/apis'
export default{
	name:'taskEdit',
	data(){
		return{
			isEdit:this.$route.query.isEdit,
			form:{...form},
			system:[{
				index:"1",
				text:'安卓'
			},{
				index:"2",
				text:'IOS'
			}],
			rules:{
				// name:[
				// 	{required:true,message:'必填'}
				// ],
				// downloadUrl:[
				// 	{required:true,message:'必填'}
				// ],
				// type:[
				// 	{required:true,message:'必填'}
				// ],
				// projectManager:[
				// 	{required:true,message:'必填'}
				// ],
				// testManager:[
				// 	{required:true,message:'必填'}
				// ],
				// projectId:[
				// 	{required:true,message:'必填'}
				// ],
				// version:[
				// 	{required:true,message:'必填'}
				// ],
				// receiveMail:[
				// 	{required:true,message:'必填'}
				// ]
				toEmail:[
					{required:true,message:'必填'}
				]
			},
			emails:[]
		}
	},
	methods:{
		exceed(files, fileList){
			// console.log(files, fileList)
			this.$message.error("超出限制个数,请先删除列表已有的文件");
		},
		success(response, file, fileList){
			console.log(response, file, fileList);
			const {status, data} = response;
			if(!status){
				this.$message.success("上传成功！");
				response.data.name = response.data.fileName;
				this.form.task.uploadFile.push(response.data);
			}else{
				this.$message.error(data);
				this.form.task.uploadFile = [];
			}
		},
		remove(files, fileList){
			this.form.task.uploadFile = fileList;
		},
		getCheckboxVal(labelArr){
			let valArr = [];
			this.system.forEach(item=>{
				labelArr.forEach(item1=>{
					if(item.text == item1) {valArr.push(item.index)}
				})
			})
			return valArr
		},
		getCheckboxLabel(valArr){
			let labelArr = [];
			this.system.forEach(item=>{
				valArr.forEach(item1=>{
					if(item.index == item1) {labelArr.push(item.text)}
				})
			})
			return labelArr
		},
		onSubmit(){
			this.$refs.form.validate((valid,obj)=>{
				if(valid){
					const systemList = this.getCheckboxVal(this.form.task.systemList); 
					let data = JSON.parse(JSON.stringify(this.form));
					data.task.system = systemList.join(",");
					data.task.testCase = this.form.task.uploadFile.length?this.form.task.uploadFile[0].id:'';
					delete data.task.systemList;
					delete data.task.uploadFile;
					this.$axios.post('/api/task/auditTask',{...data})
					.then(res=>{
						const {status, data} = res.data;
						if(!status){
							this.$message.success(data);
							this.$router.push("proManage")
						}
					})
				}
			})
		},
		cancel(){
			this.$refs.form.resetFields();
			// this.form = {...form};
			// this.fileList = [];
			this.$router.push("proManage")
		},
		getProTask(){

			const id = this.$route.query.id;
			this.$axios.get('/api/task/getTask', {params:{id}})
			.then((res)=>{
				const {status, data} = res.data;
				const {keys, is} = Object;
				if(!status){
					for(let key of keys(this.form.project)){
						this.form.project[key]=data.project[key];
					}
					for(let key of keys(this.form.task)){
						this.form.task[key]=data[key];
						if(is(key,"systemList")){
							this.form.task[key]=this.getCheckboxLabel(data[key]);
						}
						if(is(key,"uploadFile")){
							this.form.task[key] = []
							if(data[key]){
								const {fileName,fullPath, id} = data[key];
								if(fileName&&fullPath&&id) this.form.task[key]=[{name:fileName,url:'/api'+fullPath,id}];
							}
							
						}
					}
				}
			})
		}
	},
	mounted(){
		this.getProTask();
		getSupplierList({},res=>{
			this.emails = res.data.data
		},err=>{

		})
	}
}
</script>
<style lang="scss" scoped>
.fl{
	float:left;
}
.span-font{
	font-size: 20px;
    color:gray;
}
.wrap{
	@extend .span-font;
	width: 70%;
    text-align:left;
    .care{
    	color: #c0c4cc;
    }
}

</style>