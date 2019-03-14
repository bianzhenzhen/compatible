<template>
	<div class="wrap">
		<el-form ref="form"  :model="form" label-width="140px" :rules="rules" label-position="left">
		  <el-form-item label="选择项目" prop="projectId">
		    <el-select v-model="form.projectId" placeholder="请选择项目">
		      <el-option :label="item.name" :value="item.id" v-for="(item,index) in project" :key="index"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="系统选择" prop="systemList">
		    <el-checkbox-group v-model="form.systemList">
		      <el-checkbox :label="item.text" name="systemList" v-for="item in system" :key="item.index"></el-checkbox>
		    </el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="版本" prop="version">
		    <el-input v-model="form.version" placeholder="请填写版本"></el-input>
		  </el-form-item>
		  <el-form-item label="测试用例选择" required>
		    <el-upload
			  class="upload-demo"
			  action="/api/file/upload"
			  multiple
			  :limit="1"
			  :on-exceed="exceed"
			  :on-success="success"
			  :on-remove="remove"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传一个文件，且不超过20M</div>
			</el-upload>
			<div class="care">*注：标准兼容性测试用例默认覆盖各1,2级页面，如有特殊需求请上传用例，如果没有请选择无</div>
		  </el-form-item>
		  <el-form-item label="测试账号是否互踢" prop="kick">
		    <el-select v-model="form.kick" placeholder="请选择">
		      <el-option label="是" value="1"></el-option>
		      <el-option label="否" value="2"></el-option>
		    </el-select>
		    <div class="care">*注：如果账号存在互踢，请至少准备30个账号随测试用例上传</div>
		  </el-form-item>
		  <el-form-item label="报告接收邮箱" prop="receiveMail" >
		    <el-input v-model="form.receiveMail"></el-input>
		  </el-form-item>
		  <el-form-item label="机型备注" class="item-left">
		    <el-input v-model="form.modelsRemark" placeholder="默认IOS TOP50  安卓TOP250"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">确定</el-button>
		    <el-button @click="cancel">取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
const form = {
	projectId:'',
	selectSys:'',
	systemList:[],
	receiveMail:'',
	version:'',
	testCase:'',
	kick:'',
	receiveMail:'',
	modelsRemark:''
}
export default{
	name:'index',
	data(){
		return{
			catalogId:this.$route.name,
			form:{...form},
			project:[],
			system:[{
				index:1,
				text:'安卓'
			},{
				index:2,
				text:'IOS'
			}],
			fileList:[],
			rules:{
				projectId:[
					{required:true,message:'必填'}
				],
				version:[
					{required:true,message:'必填'}
				],
				receiveMail:[
					{required:true,message:'必填'}
				],
				systemList:[
					{required:true,message:'必填'}
				],
				kick:[
					{required:true,message:'必填'}
				]


			},
		}
	},
	methods:{
		exceed(files, fileList){
			// console.log(files, fileList)
			this.$message.error("超出限制个数,请先删除列表已有的文件");
		},
		success(response, file, fileList){
			// console.log(response, file, fileList,"success")
			this.testCase = '';
			const {status, data} = response;
			if(!status){
				this.$message.success("上传成功！");
				this.form.testCase = data.id;
			}else{
				this.$message.error(data);
				this.fileList = [];
			}
		},
		remove(files, fileList){
			this.testCase = '';
			this.fileList = fileList;
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
		onSubmit(){
			this.$refs.form.validate((valid,obj)=>{
				if(valid){
					if(!this.form.testCase) {
						this.$message.error("测试用例必填！")
						return
					}
					const systemList = this.getCheckboxVal(this.form.systemList);
					let config = {
					    // headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'} 
					    // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} 
					}; //添加请求头
					// const testCase = this.fileList
					this.$axios.post('/api/task/addTask',{...this.form,systemList,catalogId:this.catalogId})
					.then(res=>{
						const {status, data} = res.data;
						if(!status){
							this.$message.success(data);
							setTimeout(()=>{
								this.$router.push("taskStatus");
							},3000)
						}
					})
				}
			})
		},
		cancel(){
			this.$refs.form.resetFields();
			this.form = {...form};
			this.fileList = [];
		},
		getProjectList(){
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
	mounted(){
		this.getProjectList();
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
.item-left /deep/ > label{
	padding-left:11px;
}

</style>