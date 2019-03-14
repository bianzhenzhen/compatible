<template>
<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="layout" 
      :total="total">
    </el-pagination>
  </div>
</template>
<script type="text/javascript">
	const pageBaseSet = {
		currentPage:{
			type:['String','Number'],
			default: 1
		},
		pageSizes:{
			type:'Array',
			default: [5, 10, 20, 50]
		},
		pageSize:{
			type:['String','Number'],
			default: 5
		},
		layout:{
			type:'String',
			default:(()=>{
				const layout = "total, sizes, prev, pager, next, jumper";
				return layout
			})()
		},
		total:{
			type:[String,Number],
			default: 0
		}
	}
	let pageBaseDef = {}
	Object.keys(pageBaseSet).forEach((key)=>{
		pageBaseDef[key] = pageBaseSet[key].default
	})
export default{
	name:'vpager',
	props:{
		value:{
			type:Object,
			default:()=>pageBaseDef
		}
		
	},
	methods:{
		handleSizeChange(size){
			this.$emit('input',{...this.value,...{pageSize:size},...{currentPage:1} })
		},
		handleCurrentChange(currPage){
			this.$emit('input',{...this.value,...{currentPage:currPage} })
		}
	},
	computed:{
		currentPage(){
			return Number(this.value.currentPage) || pageBaseSet.currentPage.default
		},
		pageSizes(){
			return this.value.pageSizes || pageBaseSet.pageSizes.default
		},
		pageSize(){
			return Number(this.value.pageSize) || pageBaseSet.pageSize.default
		},
		layout(){
			return this.value.layout || pageBaseSet.layout.default
		},
		total(){
			return Number(this.value.total) || pageBaseSet.total.default
		}
	}
}
</script>
<style scoped>
	
</style>