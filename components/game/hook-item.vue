<template>
	<view class="hook-item" @click="open">
		<view class="header">
			<text>{{item.game}}</text>
			<text>{{item|remainder}}</text>
		</view>
		<view class="body">
			<view class="title">
				<view class="l">
					<text>{{item.match}}</text>
				</view>
				<view class="r">
					<text class="site">{{wayText}}</text>
					<text class="status" v-if="MATCH_STATUS_MATCHING.indexOf(item.status)>=0">{{item|costTime}}</text>
					<text class="status" v-else>{{item|status}}</text>
				</view>
			</view>
			<view class="content">
				<text>{{$t("game.reversedNumber")}}</text>
				<text>{{wayText}}</text>
				<text>{{item.score}}</text>
				<text>@</text>
				<text>{{item.odds | formatOdds}}%</text>
			</view>
		</view>
	</view>
</template>

<script>
	import item from "./mixin/item-mixin.js";

	export default {
		mixins: [item]
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";

	.hook-item {
		margin: 0upx 20upx;
		background-color: #fff;
		padding-bottom: 20upx;
		@include primary-border-color;
		//border-color: #00562F;
		border-style: solid;
		border-width: 1upx;
		border-top-left-radius: 15upx;
		border-top-right-radius: 15upx;
		
		
		//border-bottom-left-radius: 15upx;
		//border-bottom-right-radius: 15upx;

		.header {
			padding: 20upx 10upx;
			@include background-color;
			border-top-left-radius: 10upx;
			border-top-right-radius: 10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;
			font-size: 1.2em;
			font-weight: 700;
			//background-color: #00562F;
		}

		.body {
			.title {
				display: flex;
				justify-content: space-between;
				padding: 10upx;

				.l {
					.vs {
						margin: 0 10upx;
					}
				}

				.r {
					.status,.site{
						color: #a50000;
						border-radius: 5upx;
						padding: 5upx 10upx;
						background-color: #ffc6c6;
						margin-left: 10upx;
						min-width: 90upx;
						display: inline-block;
						text-align: center;
					}
					
					.site{
						color: #613086;
						background-color: #dcb0ff;
					}
				}
			}
			.content{
				text-align: center;
				font-weight: 700;
				padding: 10upx;
				font-size: 1.1em;
			}
		}
	}
</style>
