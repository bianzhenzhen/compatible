<template>
	<div class="wrap">
		<div class="project-item fl" v-for="item in allManage">
			<div class="title">{{item.countName}}</div>
			<div class="item">
				<div class="item-box" :class="{'item-diff':index!=0}" v-for="(item1,index) in item.content">
					<div>{{item1.name}}</div>
					<div>{{item1.value}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'allManage',
	data(){
		return{
			allManage:[]
		}
	},
	mounted(){
		this.$axios.get('/api/manager/getOverView')
		.then(res=>{
			const {status, data} = res.data;
			if(!status){
				this.allManage = [...data];
			}
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
	color:gray;
	.project-item{
		width: 360px;
	    height: 190px;
	    border-radius: 22px;
	    border: 2px solid rgb(192,192,192);
	    position:relative;
	    display: inline-block;
    	margin: 25px;
    	cursor:pointer;
    	text-align:left;
    	.title{
    		text-align: left;
		    font-size: 18px;
		    padding: 15px;
    	}
		
	}
	.item-box{
		width: 150px;
	    height: 100px;
	    border-radius: 18px;
	    background: rgb(7,196,168);
	    margin: 15px;
    	display: inline-block;
    	color:white;
    	text-align: left;
    	div{
    		padding: 0 20px;
    		&:first-child{
    			margin-top: 15px;
    		}
    		&:last-child{
    			margin-top:30px;
    		}
    	}
	}
	.item-diff{
		background:rgb(255,116,115);
	}
}
</style>