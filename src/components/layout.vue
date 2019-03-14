<template>
	<div class="lay">
		<div class="lay-header">
			<v-header></v-header>
		</div>
		<div class="lay-container">
			<div class="lay-left">
				<v-asider :default-active="defaultActive"></v-asider>
			</div>
			<div class="lay-right">
				<div class="breadcrumb">
					<el-breadcrumb separator-class="el-icon-arrow-right">
					  <el-breadcrumb-item v-for="(item,index) in breadList.parent" 
					  :key="index"
					  v-if="breadList.parent && breadList.parent.length">{{item}}</el-breadcrumb-item>
					  <el-breadcrumb-item>{{breadList.title}}</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<div class="main" >
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import VHeader from './vheader';
import VAsider from './vasider';
export default{
	components:{VHeader,VAsider},
	data(){
		return{
			defaultActive:this.$route.name,
			breadList:this.$route.meta
		}
	},
	methods:{

	},
	watch:{
		"$route":{
			handler(v,o){
				this.defaultActive = v.name;
				this.breadList = v.meta;
			},
			deep:true
		}
	}
}
</script>
<style lang="scss" scoped>
.lay{
	height: 100%;
  	width:100%;
	&-header{
	  	color: #333;
	    text-align: center;
	    line-height: 90px;
	    height:90px;
		background-color: #363636;
		position: fixed;
	    width: 100%;
	    z-index: 99;
	}
	&-container{
		height:100%;
  		width:100%;
		padding-top:90px;
		box-sizing: border-box;
	}
	&-left{
		width: 15%;
	    background: rgb(64,64,64);
	    float: left;
	    min-height: 100%;
	    position: fixed;
	}
	&-right{
		padding:1%;
		width: 85%;    
		background: #f0f0f0;
	    float: right;
	    min-height: 100%;
	    box-sizing: border-box;
	    .breadcrumb{
		    padding-bottom: 10px;
	    }
	    .main{
	    	background: white;
		    min-height: 650px;
		    border-radius: 2px;
	    }
	}
	&-right /deep/ .wrap{
		padding:30px;
	}
}
</style>