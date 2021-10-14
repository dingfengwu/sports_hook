<template>
	<view class="match-item" @click="open">
		<view class="team">
			<view v-if="config.showTeamImage">
				<image :src="item.team_a_logo"></image>
			</view>
			<text :class="{'no-img':!config.showTeamImage}">{{item.team_a}}</text>
		</view>
		<view class="match-info">
			<view class="title">{{item.game}}</view>
			<view class="time">{{item|remainder}}</view>
			<view class="score" v-if="item.status===MATCH_STATUS_FINISHED">{{item.score_a}} - {{item.score_b}}</view>
			<view class="score vs" v-else>VS</view>
		</view>
		<view>
			<view v-if="config.showTeamImage">
				<image :src="item.team_b_logo"></image>
			</view>
			<text :class="{'no-img':!config.showTeamImage}">{{item.team_b}}</text>
			<view class="turnover" v-if="config.showSaleVolume===1">
				{{$t("game.saleVolume")}}<text>{{item.sale_volume}}</text>
			</view>
		</view>

		<view class="left" v-if="MATCH_STATUS_MATCHING.indexOf(item.status)>=0">{{item|costTime}}</view>
		<view class="left" v-else>{{item|status}}</view>
	</view>
</template>

<script>
	import item from "./mixin/item-mixin.js";
	
	export default {
		mixins:[item]
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";
	
	.match-item {
		height: 200upx;
		display: flex;
		text-align: center;
		margin: 20upx;
		padding: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		font-size: 0.9em;
		position: relative;
		align-items: center;

		>view {
			flex: 1;
			position: relative;
		}

		.no-img {
			font-size: 1.2rem;
		}

		.left {
			position: absolute;
			left: 20upx;
			top: 20upx;
			padding: 0 !important;
			@include warning-text-color;
		}

		.match-info {
			line-height: 1.5;

			.title {
				font-size: 1.5em;
				font-weight: 700;
			}
			.time{
				padding-top: 3px;
				@include light-text-color;
			}

			.score {
				font-size: 2em;
				color: #ff0000;
				
				&.vs{
					color: #555;
				}
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

			text {
				color: #F0AD4E;
				margin-left: 5upx;
			}
		}

	}
</style>
