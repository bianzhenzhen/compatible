<template>
	<div class="header-content">
		<div class="content-left">
			<i class="el-icon-menu logo"></i>
			<span class="logo">MCAT</span>移动兼容性测试
		</div>
		<div class="content-right">
			<span class="fl">{{lev}}</span>
			<!-- 全屏显示 -->
            <div class="btn-fullscreen fl" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!-- 消息中心 -->
            <!-- <span class="btn-bell fl">
            	<el-badge :value="message" class="btn-bell-item">
				  	<router-link to="/tabs">
                        <i class="el-icon-bell"></i>
                    </router-link>
				</el-badge>
            </span> -->
            <!-- 用户头像 用户名下拉菜单 -->
            <el-dropdown class="fl" trigger="click" placement="bottom-end">
			  <span class="user-avator">
			  	<img src="../assets/Koala.jpg">
			  	<!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <!-- <el-dropdown-item><router-link tag="span" :to="{path:'userInfo',query:{id:'3'}}">用户信息</router-link></el-dropdown-item> -->
			    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>
<script>
export default{
	name:'vheader',
	data(){
		return{
			message:"2",
			fullscreen:false,
		}
	},
	methods:{
		logOut(){
			this.$common.removeLocalStorage("token");
			this.$store.dispatch('AddRoutes',[]); //路由注销
			this.$router.push("/login");
			console.log("退出")
		},
		// 全屏事件
        handleFullScreen(){
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
	},
	computed:{
		lev(){
			const levList = this.$common.getLocalStorage('roles',true);
			let arr = levList.map((item)=>{
				return item == 1 ? '管理员':'普通用户'
			})
			return arr.join(",")
		}
	}
}
</script>

<style lang="scss" scoped>
.fl{
	float:left;
}
.header-content{
	color:white;
	.content-left{
		float:left;
		padding: 0 50px;
    	font-size: 18px;
	}
	.content-right{
		float:right;
	}
	.logo{
		font-size:20px;
		line-height:85px;
		color:blue;
		margin-right:10px;
	}
	.btn-bell-item{
		line-height: 30px;
    	padding: 0 5px;
	}
	.btn-fullscreen{
    	font-size: 21px;
    	margin: 0 10px;
	}
	.el-dropdown{
		margin:24px;
	}
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }

}

</style>