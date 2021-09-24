<template>
	<view class="single-match" @click="openDetail">
		<view class="team">
			<view>
				<image></image>
			</view>
			<text>吉兰丹联队</text>
		</view>
		<view class="match-info">
			<view class="status">进行中</view>
			<view>马来西亚甲联赛</view>
			<view class="stage">45'下</view>
			<view class="score">2-2</view>
		</view>
		<view>
			<view>
				<image></image>
			</view>
			<text>吉兰丹联队</text>
			<view class="turnover">销量<text>1230</text></view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			openDetail(){
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.single-match {
		height: 200upx;
		display: flex;
		text-align: center;
		margin: 20upx;
		padding: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		font-size: 0.9em;

		>view {
			flex: 1;
			position: relative;
			
			&:first-child,&:last-child{
				padding-top: 40upx;
			}
		}

		.match-info {
			line-height: 1.8;

			.status {
				color: #777;
			}

			.stage {
				color: #ff0000;
			}

			.score {
				font-weight: 700;
				font-size: 1.5em;
			}
		}

		image {
			width: 100upx;
			height: 100upx;
		}

		.turnover {
			position: absolute;
			top: 0upx;
			right: 10upx;
			color: #777;
			
			text{
				color: #F0AD4E;
				margin-left: 5upx;
			}
		}

	}
</style>
