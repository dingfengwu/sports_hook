<template>
	<view class="content">
		<h1>{{title}}</h1>
		<h2><i class="iconfont icon-rili"></i>{{subTitle}}</h2>
		<p v-html="content"></p>
	</view>
</template>

<script>
	export default {
		props:["content","title","subTitle"]
	}
</script>

<style scoped lang="scss">
	.content{
		padding: 20upx;
		
		h1{
			text-align: center;
			font-size: 1.6em;
			padding: 20upx;
		}
		
		h2{
			text-align: right;
			color: #999;
			font-size: 0.8em;
			padding: 10upx;
			
			i{
				margin-right: 10upx;
			}
		}
		p{
			line-height: 1.6;
		}
	}
</style>
