<template>
	<view class="betting">
		<uni-nav-bar left-icon="back" :title="races.name" shadow="false" backgroundColor="transparent"
			@clickLeft="$back"></uni-nav-bar>
		<item :item="races"></item>
		<view class="nav">
			<button :class="{active:active===0}" @click="active=0">{{$t("game.allSite")}}</button>
			<button :class="{active:active===1}" @click="active=1">{{$t("game.upHalfSite")}}</button>
		</view>

		<all-site v-if="active===0" :data="allSiteData" @bet="bet"></all-site>
		<up-half-site v-else-if="active===1" :data="upHalfSiteData" @bet="bet"></up-half-site>

		<uni-popup ref="popup" type="bottom">
			<view class="bet-popup-container">
				<view class="title">{{$t("game.avaliableBalance")}}:{{systemConfig.currency_symbol}}
					{{userInfo.abalance|toThousandslsFilter}}
				</view>
				<view class="game-info">
					<view class="l">
						<p>{{gameType}} {{currentBet.score}}</p>
						<p>{{races.master_name}} VS {{races.client_name}} <br /> {{races.name}}</p>
					</view>
					<view class="r">@{{currentBet.odds}}%</view>
				</view>
				<view class="bet-amount">
					<text>{{systemConfig.currency_symbol}}</text> <input v-model="form.amount" type="digit"
						:placeholder="$t('game.messageBetAmount')" />
				</view>
				<view class="notice">
					<view>{{$t("game.expectWin")}}:</view>
					<view>{{$t("game.handFee")}}:5%</view>
				</view>
				<view class="keyboard">
					<view v-for="(item,index) in keyboard" :key="index" @click="inputAmount(index)"><i
							v-if="index!==14">{{item}}</i><i class="iconfont icon-jp-del" v-else></i>
					</view>
				</view>
				<view class="bet">
					<button type="primary" class="circle">{{$t("game.labBet")}}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import item from "../../components/game/races-item.vue";
	import allSite from "../../components/game/all-site.vue";
	import upHalfSite from "../../components/game/up-half-site.vue"

	export default {
		components: {
			item,
			allSite,
			upHalfSite
		},
		data() {
			return {
				keyboard: ["1", "2", "3", "+100", "4", "5", "6", "+200", "7", "8", "9", "+500", ".", "0", "x", this.$t(
					"game.max")],
				form: {
					amount: 0
				},
				allSiteData: [{
						score: "0-0",
						odds: "16.89",
						sale_volume: 121356
					},
					{
						score: "0-1",
						odds: "156.89",
						sale_volume: 121356
					},
					{
						score: "1-0",
						odds: "196.89",
						sale_volume: 1254
					},
				],
				upHalfSiteData: [{
						score: "0-0",
						odds: "16.89",
						sale_volume: 121356
					},
					{
						score: "0-1",
						odds: "156.89",
						sale_volume: 121356
					},
					{
						score: "1-0",
						odds: "196.89",
						sale_volume: 1254
					},
				],
				active: 0,
				currentBet: {},
				races: {
					type_id: 1,
					type_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					type_name: "芬兰甲级联赛",
					time: "2021-09-09",
					sale_volume: 500,
					name: "芬兰超级联赛",
					master_name: "英特土尔库",
					master_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
					client_name: "洪卡",
					client_logo: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
				}
			}
		},
		computed: {
			...mapGetters(["systemConfig", "userInfo"]),
			gameType() {
				if (this.active === 0) {
					return this.$t("game.allSite");
				} else if (this.active === 1) {
					return this.$t("game.upHalfSite");
				}
			}
		},
		methods: {
			bet(item) {
				this.form.amount="";
				this.currentBet = item;
				this.$refs["popup"].open();
			},
			inputAmount(index) {
				if ([0, 1, 2, 4, 5, 6, 8, 9, 10, 13].indexOf(index) >= 0) {
					this.form.amount = this.form.amount.toString() + this.keyboard[index].toString();
				} else if ([3, 7, 11].indexOf(index) >= 0) {
					this.form.amount = (+this.form.amount + (+(this.keyboard[index].replace("+", "")))).toString();
				} else if (index === 15) {
					this.form.amount = this.userInfo.abalance.toString();
				} else if (index === 14) {
					if (this.form.amount.length > 0 && this.form.amount !== '') {
						let value = this.form.amount.substr(0, this.form.amount.length - 1);
						if (value.substr(value.length - 1) === '.') {
							value = value.substr(0, value.length - 1);
						}
						this.form.amount = value;
					}
				} else if (index === 12) {
					if (this.form.amount.indexOf('.') < 0) {
						this.form.amount = this.form.amount + ".";
					}
				}

				if (this.form.amount.substr(0, 1) === '0') {
					if (this.form.amount.length > 1) {
						this.form.amount = this.form.amount.substr(1);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.betting {
		.nav {
			display: flex;
			padding: 10upx;

			button {
				flex: 1;
				border: 0;
				border-bottom: solid 4upx transparent;
				border-radius: 0;

				&.active {
					border-color: $uni-color-primary;
				}

				&:after {
					width: 0;
					height: 0;
					content: "";
				}
			}
		}
	}

	.bet-popup-container {
		background-color: #fff;
		padding: 20upx;

		.title {
			text-align: center;
			padding: 20upx;
			color: #777;
			padding-bottom: 40upx;
		}

		.game-info {
			display: flex;
			justify-content: space-between;

			.l {
				p {
					font-size: 0.8em;
					color: #999;

					&:first-child {
						font-size: 1.5em;
						color: #333;
					}
				}
			}

			.r {
				text-align: right;
				font-size: 1.2em;
			}
		}

		.bet-amount {
			display: flex;
			margin-top: 100upx;
			font-size: 1.5em;

			input {
				flex: 1;
				padding: 0upx 10upx;
				border-bottom: solid 2upx $uni-color-primary;
			}
		}

		.notice {
			display: flex;
			justify-content: space-between;
			font-size: 0.8em;
			color: #999;
			padding: 10upx 0;

			view {
				&:last-child {
					text-align: right;
				}
			}
		}

		.keyboard {
			display: flex;
			flex-wrap: wrap;
			padding: 20upx;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;

			view {
				flex-basis: 25%;
				padding: 10upx 0;
				font-size: 1.5em;
				font-weight: 700;
				text-align: center;

				&:nth-of-type(4n) {
					font-weight: normal;
					font-size: 0.9em;
				}

				i {
					font-style: normal;
				}

				.icon-jp-del {
					font-weight: 700;
					font-size: 1.5em;
				}
			}
		}
		
		.bet{
			
		}
	}
</style>
