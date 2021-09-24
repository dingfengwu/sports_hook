<template>
	<view class="game-detail">
		<uni-nav-bar left-icon="back" :title="$t('game.titleDetail')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back"></uni-nav-bar>
		<view class="basic-info">
			<view class="award">
				<image src="../../static/game/win.png"></image>
			</view>
			<view class="prize">
				{{currentGameDetail.prize}}
			</view>
			<view class="strong">
				<view class="series">{{currentGameDetail.series}}</view>
				<view class="name">{{currentGameDetail.lottery_name}}</view>
			</view>
		</view>
		<view class="detail">
			<view>
				<text class="label">{{$t("game.labelWay")}}</text>
				<text class="normal">{{currentGameDetail.way}}</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelOdds")}}</text>
				<text class="normal">----</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelStartTime")}}</text>
				<text>--</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelRaceResult")}}</text>
				<text>{{currentGameDetail.winning_number}}</text>
			</view>
		</view>
		<view class="detail">
			<view>
				<text class="label">{{$t("game.labelBetAmount")}}</text>
				<text class="normal">{{currentGameDetail.amount}}</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelHandFee")}}</text>
				<text>----</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelBetTime")}}</text>
				<text>{{currentGameDetail.bought_at}}</text>
			</view>
			<view>
				<text class="label">{{$t("game.labelOrderNo")}}</text>
				<text>{{currentGameDetail.serial_number}}</text>
			</view>
		</view>
		<view class="detail">
			<view>
				<text class="label">{{$t("game.labelPrize")}}</text>
				<text>{{currentGameDetail.prize}}</text>
			</view>
			<view class="normal">
				<text class="label">{{$t("game.labelPrizeTime")}}</text>
				<text>----</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapGetters(["currentGameDetail"])
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.game-detail {
		.basic-info {
			background-color: #fff;
			margin: 5upx 20upx;
			border-radius: 10upx;
			padding: 30upx;
			margin-top: 20upx;

			.award {
				text-align: center;

				image {
					width: 100upx;
					height: 100upx;
					transform: translateY(-60upx);
					border-radius: 80upx;
					padding: 15upx;
					background-color: #fff;
				}
			}

			.prize {
				padding: 50upx 0;
				font-weight: 700;
				text-align: center;
				padding-top: 0upx;
				margin-top: -50upx;
			}

			.series {
				padding: 40upx;
				text-align: center;
			}

			.name {
				padding: 20upx;
				text-align: center;
			}
			
			.strong{
				background-color: #f0f0f0;
				color: #555;
				border-radius: 10upx;
			}
		}

		.detail {
			margin: 5upx 30upx;
			background-color: #fff;
			border-radius: 10upx;
			color: #777;
			padding: 20upx 20upx;
			line-height: 2;

			>view {
				display: flex;
				justify-content: space-between;
			}

			.label {
				color: #777;
			}
			.normal{
				color: #333;
			}
		}
	}
</style>
