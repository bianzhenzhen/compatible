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
					type="text"
					size="small">
					待审核
		        </el-button>
		        <el-button
	        		v-if="scope.row.status==2"
			        type="text"
		          	size="small">
		          	测试中
		        </el-button>
		        <el-button
					type="text"
					v-if="scope.row.status==3"
					size="small"
					@click="goPortDetail(scope.row.id)"
					>
					查看报告
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
		goPortDetail(id){
			this.$router.push({name:'proDetail',params:{id:id}})
		},
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