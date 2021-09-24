<template>
	<view class="all-site">
		<view class="title">
			<span>{{$t("game.labelAllSiteScore")}}</span>
			<span>{{$t("game.labelOdds")}}</span>
			<span>{{$t("game.labVolumeSale")}}</span>
			<span>{{$t("game.labBet")}}</span>
		</view>
		<view class="body">
			<view class="row" v-for="(item,index) in data" :key="index">
				<span>{{item.score}}</span>
				<span>{{item.odds}}%</span>
				<span>{{item.sale_volume}}</span>
				<view><button @click="bet(item)">{{$t("game.bet")}}</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["data"],
		methods: {
			bet(item) {
				this.$emit("bet", item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all-site {
		color: #555;
		padding: 20upx;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx;

			span {
				flex-basis: 25%;
				text-align: center;
			}
		}

		.body {
			.row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;
				background-color: #fff;
				border-radius: 15upx;
				margin: 20upx 0;

				>span,
				>view {
					flex-basis: 25%;
					text-align: center;

					&:first-child,
					&:nth-of-type(2) {
						font-weight: 700;
					}
				}

				button {
					background-color: $uni-color-success;
					border-radius: 20upx;
					padding: 0upx 30upx;
					color: #fff;
					height: 60upx;
					line-height: 60upx;
					font-size: 0.9em;
					border-radius: 30upx;
				}
			}
		}
	}
</style>
