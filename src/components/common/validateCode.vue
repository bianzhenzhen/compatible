<template>
	<div class="canvas-style">
		<canvas id="canvas" width="120" height="40"></canvas>
  		<a href="javascript:void(0)" id="changeImg" @click="drawPic">看不清，换一张</a>
  	</div>
</template>
<script type="text/javascript">
export default {
	name:'validateCode',
	props:{

	},
	methods:{
		randomNum(min,max){/**生成一个随机数**/
	    	return Math.floor( Math.random()*(max-min)+min);
		},
	  	randomColor(min,max){/**生成一个随机色**/
		    var r = this.randomNum(min,max);
		    var g = this.randomNum(min,max);
		    var b = this.randomNum(min,max);
		    return "rgb("+r+","+g+","+b+")";
		},  
  		drawPic(){/**绘制验证码图片**/
		    var canvas=document.getElementById("canvas");
		    var width=canvas.width;
		    var height=canvas.height;
		    var ctx = canvas.getContext('2d');
		    ctx.textBaseline = 'bottom';

		    /**绘制背景色**/
		    ctx.fillStyle = this.randomColor(180,240); //颜色若太深可能导致看不清
		    ctx.fillRect(0,0,width,height);
		    /**绘制文字**/
		    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
		    var saveText = '';
		    for(var i=0; i<4; i++){
		      var txt = str[this.randomNum(0,str.length)];
		      ctx.fillStyle = this.randomColor(50,160);  //随机生成字体颜色
		      ctx.font = this.randomNum(20,40)+'px SimHei'; //随机生成字体大小
		      var x = 10+i*25;
		      var y = this.randomNum(25,45);
		      var deg = this.randomNum(-45, 45);
		      //修改坐标原点和旋转角度
		      ctx.translate(x,y);
		      ctx.rotate(deg*Math.PI/180);
		      ctx.fillText(txt, 0,0);
		      //恢复坐标原点和旋转角度
		      ctx.rotate(-deg*Math.PI/180);
		      ctx.translate(-x,-y);
		      saveText += txt;
		      if(i === 3) this.$emit('show-code',saveText);
		    }
		    /**绘制干扰线**/
		    for(var i=0; i<3; i++){
		      ctx.strokeStyle = this.randomColor(40,180);
		      ctx.beginPath();
		      ctx.moveTo( this.randomNum(0,width), this.randomNum(0,height) );
		      ctx.lineTo( this.randomNum(0,width), this.randomNum(0,height) );
		      ctx.stroke();
		    }
		    /**绘制干扰点**/
		    for(var i=0; i<30; i++){
		      ctx.fillStyle = this.randomColor(0,255);
		      ctx.beginPath();
		      ctx.arc(this.randomNum(0,width),this.randomNum(0,height), 1, 0, 2*Math.PI);
		      ctx.fill();
		    }
		}
	}
}
	
</script>