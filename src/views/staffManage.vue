<template>
	<div class="wrap">
		<div class="search">
			<span>用户账号：</span><div class="input-style"><el-input v-model="params.accountName" placeholder="请输入内容">
				<el-button slot="append" @click="searchInfoFromName">搜索</el-button>
			</el-input></div>
		</div>
		
		  <el-table
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="accountName"
		      label="用户名">
		    </el-table-column>
		    <el-table-column
		      prop="passwordEnter"
		      label="密码">
		    </el-table-column>
		    <el-table-column
		      prop="statusText"
		      label="状态">
		    </el-table-column>
		    <el-table-column
		      prop="createAt"
		      label="创建时间">
		    </el-table-column>
		    <el-table-column
		      prop="updateAt"
		      label="修改时间">
		    </el-table-column>
		    <el-table-column
		      prop="operation"
		      label="操作">
		      	<template slot-scope="scope">
			        <el-button
			          @click.native.prevent="edit(scope.$index, scope.row)"
			          type="primary"
			          size="small">
			          修改
			        </el-button>
			        <el-button
			        	@click.native.prevent="del(scope.$index, scope.row)"
			          	size="small">
			          删除
			        </el-button>

	      		</template>
		    </el-table-column>
		  </el-table>
		  <div class="pager" v-if="pager.total">
		  	<v-pager v-model="pager"></v-pager>
		  </div>

		  <el-dialog
			  :visible.sync="diaVisible"
			  title="修改用户信息"
			  width="50%"
			  center>
			  <div>
			  	<el-form ref="form" :model="form" label-width="110px" :rules="rules">
				  <el-form-item label="用户名：" prop="accountName">
				    <el-input v-model="form.accountName" placeholder="请输入用户名"></el-input>
				  </el-form-item>
				  <el-form-item label="密码：" prop="password">
				    <el-input type="password" v-model="form.password" placeholder="请输入密码" @focus="form.password = ''"></el-input>
				  </el-form-item>
				  <el-form-item label="状态：" prop="status">
				    <el-select v-model="form.status" placeholder="请选择状态">
				      <el-option label="无效" value="0"></el-option>
				      <el-option label="有效" value="1"></el-option>
				    </el-select>
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
import VPager from '@/components/common/vpager'
import {getUserInfo, deleteUser, updateUser} from '@/apis'
const form = {
	accountName:'',
	password:'',
	status:''
}
export default{
	name:'taskStatus',
	components:{VPager},
	data(){
		return{
			diaVisible:false,
			params:{
				accountName:'',
				page:1,
				rows:5
			},
			form:{...form},
			tableData: [],
	        pager:{
	        	currentPage:1,
	        	pageSize:5,
	        	total:0
	        },
	        rules:{
	        	accountName:{required:true,message:'必填'},
				password:{required:true,message:'必填'},
				status:{required:true,message:'必填'}
	        }
		}
	},
	methods:{
		searchInfoFromName(){
			this.params.page =1;
			this.params.rows =5;
			this.searchInfo()
		},
		searchInfo(){
			getUserInfo(this.params,(res)=>{
				const {status, data} = res.data;
				if(!status){
					data.obj.forEach(item=>{
						item.statusText = item.status == "1" ? '有效' : '无效';
						item.passwordEnter = '******';
					})
					this.tableData = [...data.obj];
					this.pager.currentPage = Number(data.page);
					this.pager.pageSize = Number(data.pageSize);
					this.pager.total = Number(data.totalNumber);

				}
			})
		},
		edit(index, row){
			const {id, accountName, password, status} = row;
			this.form = {id, accountName, password, status};
			this.diaVisible = true;
			if(this.$refs.hasOwnProperty("form")){
				this.$refs.form.resetFields();
			}
		},
		del(index,row){
			this.visiblePop = false;
			deleteUser({id:row.id},(res)=>{
				const {status, data} = res.data;
				if(!status){
					this.$message.success(data);
					this.searchInfo();
				}
			})
		},
		diaSure(){
			this.$refs.form.validate( (valid, obj) => {
				if(valid){
					updateUser(this.form, (res)=>{
						const {status, data} = res.data;
						if(!status){
							this.$message.success(data);
							this.searchInfo();
							this.diaVisible = false;
						}
					})
				}
			})
		}
	},
	mounted(){
		this.searchInfo();
	},
	watch:{
		"pager":{
			handler(n,o){
				this.params.page = n.currentPage;
				this.params.rows = n.pageSize;
				this.searchInfo();
			},
			deep:true
		}
	}
}
</script>
<style lang="scss" scoped>
.search{
	margin-bottom:30px;
	.input-style{
		width: 300px;
	    display: inline-block;
	}
	span{
		font-size: 16px;
	    padding: 12px;
	}
}

.fl{
	float:left;
}
.span-font{
	font-size: 20px;
    color:gray;
}
.wrap{
	@extend .span-font;
    text-align:left;
    .pager{
    	text-align:center;
    	margin:20px 0;
    }
}

</style>