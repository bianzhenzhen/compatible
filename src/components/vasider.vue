<template>
	<div class="asider-content">
	    <el-menu
	      :default-active="defaultActive"
	      class="el-menu-vertical-demo"
	      background-color="#404040"
	      text-color="#fff"
	      active-text-color="#ffd04b"
	      unique-opened
	      router>
	      <el-menu-item :index="item.index" v-for="(item,index) in menuList.menuList" 
	      :key="index" 
	      v-if="item.type">
	        <i :class="item.icon"></i>
	        <span slot="title">{{item.title}}</span>
	      </el-menu-item>

	      <el-submenu :index="String(i)" v-for="(item,i) in menuList.menuList" 
	      :key="i" 
	      v-if="!item.type">
	        <template slot="title">
	          <i :class="item.icon"></i>
	          <span>{{item.title}}</span>
	        </template>
	        <el-menu-item :index="subItem.index"  v-for="(subItem,index) in item.subs" 
	        :key="index"
	        v-if="subItem.type">
		        <i :class="subItem.icon"></i>
		        <span slot="title">{{subItem.title}}</span>
		    </el-menu-item>

	        <!-- <el-submenu :index="subItem.index" v-for="subItem in item.subs" v-else>
	          <i :class="subItem.icon"></i>
	          <template slot="title">{{subItem.title}}</template>
	          <el-menu-item :index="sub2Item.index" v-for="sub2Item in subItem.subs">{{sub2Item.title}}</el-menu-item>
	        </el-submenu> -->
	        
	      </el-submenu>

	      

	    </el-menu>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	name:'vasider',
	props:['defaultActive'],
	data(){
		return{
		}
	},
	computed:mapState(['menuList'])
	
}
</script>

<style lang="scss" scoped>
.color{
	color:white;
}
.asider-content,.el-menu-item,.el-menu-vertical-demo /deep/ .el-submenu__icon-arrow{
	@extend .color;

}
.el-menu-vertical-demo{
	min-height: 693px;
}
</style>