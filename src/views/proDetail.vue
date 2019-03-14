<template>
	<div class="wrap">
		<div class="title">
			<span>{{pieData.appName}}</span><br>
			<span>{{pieData.appVersion}}</span>

		</div>
		<div class="down-btn"><el-button type="primary" @click="downfile">下载文件</el-button></div>
		<div class="content clearfix">
			
			<div class="box box1 ">
			  	<div class="box1_t"><span></span><span>{{value}}</span></div>
			  	<div class="box1_m"><i class="el-icon-success"></i><span>{{name}}</span></div>
			  	<div class="box1_b">{{msg}}</div>
			</div>
			<div class="box box2 " id="chart">
				
			</div>
			<div class="box box3 ">
			  	<div class="box3_arr">
			  		<div class="box3_item" v-for="(term,index) in terms" :key="index">
				  		<div>{{term.value}}</div>
				  		<div>{{term.name}}</div>
				  	</div>
			  	</div>
			</div>
			<div class="box box4">
			  	<div class="box4_title">性能概况</div>
			  	<div class="box4_content">
			  		<div class="box4_arr">
				  		<div class="box4_item" :class="{'no_ml':index%3==0,'no_mr':index%3==2}" 
				  		v-for="(per,index) in performs" :key="index">
					  		<div>{{per.name}}</div>
					  		<div>{{per.value}} <i class="el-icon-caret-top"></i></div>
					  	</div>
				  	</div>
			  	</div>
		  	</div>
		</div>
	</div>
</template>
<script>
import echarts from 'echarts';
import {getTestReport,downloadFile,getProjectReport}  from '@/apis'
export default{
	name:'proDetail',
	data(){
		return{
			pieData:'',
			name:'',
			value:'',
			msg:'',
			terms:'',
			performs:[],
			fileId:''
		}
	},
	methods:{
		downfile(){
			downloadFile({id:this.fileId},res=>{
			if(res.data.status == 20){
				console.log(res.data.status)
			}else{
				window.location.href=`/api/file/downloadFile?id=${this.fileId}`
			}
			},err=>{

			})
		},
		echartInit(items){
			var myChart = echarts.init(document.getElementById('chart'));
            // 指定图表的配置项和数据
	        var option = {
	            // title: {//标题组件
	            //     text: '故障',
	            //     left:'50px',//标题的位置 默认是left，其余还有center、right属性
	            //     textStyle: {    
	            //     color: "#436EEE",    
	            //     fontSize: 17,   
	            //     }
	            // },
	            tooltip : { //提示框组件
	                trigger: 'item', //触发类型(饼状图片就是用这个)
	                formatter: "{a} <br/>{b} : {c} ({d}%)" //提示框浮层内容格式器
	            },
	            color:['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                           '#FE8463','#9BCA63','#FAD860'],  //手动设置每个图例的颜色
	            legend: {  //图例组件
	                // right:100,  //图例组件离右边的距离
	                orient : 'vertical',  //布局  纵向布局 图例标记居文字的左边 vertical则反之horizontal
	                width:40,      //图行例组件的宽度,默认自适应
	                height:180,      //图行例组件的宽度,默认自适应
	                x : 400,   //图例显示在右边
	                y: 'center',   //图例在垂直方向上面显示居中
	                itemWidth:30,  //图例标记的图形宽度
	                itemHeight:10, //图例标记的图形高度
	                data:[],
	                textStyle:{    //图例文字的样式
	                    color:'#333',  //文字颜色
	                    fontSize:12    //文字大小
	                }
	            },
	            series : [ //系列列表
	                {
	                    name:'设备状态',  //系列名称
	                    type:'pie',   //类型 pie表示饼图
	                    center:['30%','50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
	                    radius : ['50%', '70%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
	                    itemStyle : {  //图形样式
	                        normal : { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
	                            label : {  //饼图图形上的文本标签
	                                show : false  //平常不显示
	                            },
	                            labelLine : {     //标签的视觉引导线样式
	                                show : false  //平常不显示
	                            }
	                        },
	                        emphasis : {   //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
	                            label : {  //饼图图形上的文本标签
	                                show : true,
	                                position : 'center',
	                                textStyle : {
	                                    fontSize : '10',
	                                    fontWeight : 'bold'
	                                }
	                            }
	                        }
	                    },
	                    data:[]
	                }
	            ]
	        };
	
	        items.map(item=>item.name=(item.name+item.value+"%"))
	        let arr1 =[]
	     	for(let item of items){
				const {name} = item
				arr1.push(name)
	     	}
	       	option.legend.data=arr1
	        option.series[0].data=items
	        myChart.setOption(option);
		}
	},
	created(){
		let id = this.$route.params.id
		let objectId = this.$route.params.objectId
		if(id){
			getTestReport({id:id},(res)=>{
				this.pieData = res.data.data
				this.value=this.pieData.passMod.value
				this.name=this.pieData.passMod.name
				this.msg=this.pieData.passMod.msg
				this.terms = this.pieData.terminalMod.content
				this.performs = this.pieData.performanceMod.content
				this.fileId = this.pieData.fileId
				this.echartInit(this.pieData.exceptionMod.content)
			},(err)=>{})
		}else if(objectId){
			getProjectReport({id:objectId},(res)=>{
				this.pieData = res.data.data
				this.value=this.pieData.passMod.value
				this.name=this.pieData.passMod.name
				this.msg=this.pieData.passMod.msg
				this.terms = this.pieData.terminalMod.content
				this.performs = this.pieData.performanceMod.content
				this.fileId = this.pieData.fileId
				this.echartInit(this.pieData.exceptionMod.content)
			},(err)=>{})

		}

	},

	mounted(){
		
	}
}
</script>
<style lang="scss" scoped>
.no_ml{
	margin-left:0!important;
}
.no_mr{
	margin-right:0!important;
}
.clearfix:before,.clearfix:after{
   content:"";
   display:table;
}
.clearfix:after{
  clear:both;
}
.clearfix{
  *zoom:1;
}
.title{
	height: 70px;
    background: #2B96FA;
    color: white;
    font-size: 24px;
    padding-top: 15px;
    border-radius:10px;
}
.wrap{
	padding:0!important;
}
.down-btn{
	float:right;
	margin:5px;
}
.box{
	width:50%;
	min-width: 500px;
    height: 325px;
	box-sizing:border-box;
    // background:gray;
    float:left;
}
.box1{
	// background:gray;
	text-align:left;
	padding:20px 0 20px 107px;
	box-sizing:border-box;
	.box1_t{
		margin-top:50px;
		font-size:50px;
		span:first-child{
			 border-bottom: 4px solid green;
		}
	}
	.box1_m{
		 margin: 32px 0;
		 display:table;
		 i{
		 	font-size:35px;
		 	color:green;
		 }
		 span{
		 	font-size:24px;
		 	display:table-cell;
		 	vertical-align: middle;
    		padding-left: 10px;
		 }
	}
	.box1_b{
		font-size: 14px;
    	color: #666;
	}
}
.box2{
	// background:blue;
}
.box3{
	// background:red;
	display:table;
	color:white;
	.box3_arr{
		display:table-cell;
		vertical-align:middle;
	}
	.box3_item{
		display: inline-block;
		vertical-align:middle;
	    width: 120px;
	    height: 155px;
	    background: #F6444D;
	    border-radius: 10px;
	    margin: 0 20px;
	    &:nth-child(2){
	    	background: #FF7E00;
	    }
	    &:last-child{
	    	background: #0070F0;
	    }
	    div:first-child{
	    	font-size: 38px;
    		margin: 32px 0 18px;
	    }
	}
}
.box4{
	// background:green;
	padding:10px;
	.box4_title{
		text-align: left;
	    padding-bottom: 10px;
	    border-bottom: 1px solid #EAEAEA;
	    color:#666;
	}
	.box4_content{
		display:table;
		width: 100%;
    	height: 85%;
	}
	.box4_arr{
		display:table-cell;
		vertical-align:middle;
	}
	.box4_item{
		display: inline-block;
		vertical-align:middle;
	    width: 30%;
    	height: 123px;
	    border:1px solid #F2F2F2;
	    border-top:2px solid #3997E3;
	    margin: 10px 10px 0;
	    div:first-child{
	    	margin: 24px 0 10px;
    		font-size: 14px;
    		color:#8E8E8E;
	    }
	    div:last-child{
	    	font-size: 28px;
	    	i{
	    		color:#E9A3A1;
	    		font-size:16px;
	    	}
	    }
	}
}
</style>