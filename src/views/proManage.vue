<template>
	<div class="wrap">
		  <el-table
		    :data="tableData"
		    stripe
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="project.name"
		      label="应用名称">
		    </el-table-column>
		    <el-table-column
		      prop="version"
		      label="版本号">
		    </el-table-column>
		    <el-table-column
		      prop="accountName"
		      label="创建人">
		    </el-table-column>
		    <el-table-column
		      prop="createAt"
		      label="创建时间">
		    </el-table-column>
		    <el-table-column
		      prop="statusText"
		      label="状态">
		    </el-table-column>
		    <el-table-column
		      prop="operation"
		      label="操作">
		      	<template slot-scope="scope">
			        <el-button
			        v-if="scope.row.status==1"
			          @click.native.prevent="review(scope.$index, scope.row)"
			          type="primary"
			          size="small">
			          审核
			        </el-button>
			        <el-button
			        v-if="scope.row.status==2 || scope.row.status==3"
			          @click.native.prevent="review(scope.$index, scope.row)"
			          size="small">
			          查看
			        </el-button>
	      		</template>
		    </el-table-column>
		  </el-table>
		  <div class="pager" v-if="pager.total">
		  	<v-pager v-model="pager"></v-pager>
		  </div>
		  
	</div>
</template>
<script>
import VPager from '@/components/common/vpager'
export default{
	name:'taskStatus',
	components:{VPager},
	data(){
		return{
			tableData: [],
	        pager:{
	        	currentPage:1,
	        	pageSize:5,
	        	total:0
	        },
	        ajaxParam:{
	        	page:1,
	        	rows:5
	        }
		}
	},
	methods:{
		review(index,row){
			const isEdit = row.status == 1?1:0;
			if(row.status == 3){
			this.$router.push({name:"proDetail",params:{id:row.id} });
			}else if(row.status == 2){
				this.$message("测试中");
			}else if(row.status == 1){
				this.$router.push({path:"taskEdit",query:{id:row.id, isEdit} });
			}
		},
		// detail(a,b){
		// 	console.log(a,b,766666)
		// },
		getList(){
			const data = {...this.ajaxParam,date:new Date().getTime()};
			this.$axios.get('/api/task/getTaskStatusList',{params:data})
			.then((res)=>{
				const {status, data} = res.data;
				if(!status){
					data.obj.forEach(item => {
						switch (item.status){
							case "1": 
								item.statusText = "待审核";
								break;
							case "2":
								item.statusText = "测试中";
								break;
							default: //3
								item.statusText = "已完成";
						}
					})
					this.tableData = data.obj;
					//pager
					this.pager.currentPage = Number(data.page);
					this.pager.pageSize = Number(data.pageSize);
					this.pager.total = Number(data.totalNumber);
				}
			})
		}
	},
	mounted(){
		this.getList()
	},
	watch:{
		"pager":{
			handler(n,o){
				this.ajaxParam.page = n.currentPage;
				this.ajaxParam.rows = n.pageSize;
				this.getList();
			},
			deep:true
		}
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
    text-align:left;
    .pager{
    	text-align:center;
    	margin:20px 0;
    }
}

</style>