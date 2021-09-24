<template>
	<view class="game">
		<uni-nav-bar :title="$t('game.title')" shadow="false" backgroundColor="transparent"></uni-nav-bar>
		<uni-swiper-dot :info="bannerList" :current="current" :mode="mode" class="swiper-dot">
			<swiper class="swiper-box" @change="change" :indicator-dots="indicatorDots" :autoplay="autoplay"
				:interval="interval" :duration="duration">
				<swiper-item v-for="(item ,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.path"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>

		<view class="nav-button">
			<button :class="{active:active===0}" @click="active=0">{{$t("game.today")}}</button>
			<button :class="{active:active===1}" @click="active=1">{{$t("game.tomorrow")}}</button>
			<button :class="{active:active===2}" @click="active=2">{{$t("game.league")}}</button>
			<button :class="{active:active===3}" @click="active=3">{{$t("game.endRaces")}}</button>
		</view>
		
		<today v-if="active===0"></today>
		<tomorrow v-else-if="active===1"></tomorrow>
		<league-races v-else-if="active===2"></league-races>
		<end-traces v-else-if="active===3"></end-traces>
		
		<bottom-menu current="2"></bottom-menu>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from "vuex";
	import today from "../../components/game/today.vue";
	import tomorrow from "../../components/game/tomorrow.vue";
	import endTraces from "../../components/game/end-races.vue";
	import leagueRaces from "../../components/game/league-races.vue"
	
	export default {
		components:{today,tomorrow,endTraces,leagueRaces},
		data() {
			return {
				current: 0,
				mode: 'round',
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				active:0
			}
		},
		computed: {
			...mapGetters(["bannerList", "config"])
		},
		methods: {
			...mapActions(["getBannerList", "getUserInfo"]),
			change(e) {
				this.current = e.detail.current;
			}
		},
		created() {
			this.getBannerList();
		}
	}
</script>

<style scoped lang="scss">
	.game {
		.swiper-dot {
			margin: 0 20upx;
			margin-top: 20upx;
			border-radius: 10upx;

			.swiper-box {
				height: 190upx;

				uni-image {
					width: 100%;
					height: 190upx;
				}
			}
		}

		.nav-button {
			display: flex;
			justify-content: space-around;
			margin: 10upx 10upx;
			
			button{
				border: 0;
				flex: 1;
				font-size: 1.1em;
				border-bottom: solid 4upx transparent;
				border-radius: 0;
				
				&:after{
					content: "";
					width: 0;
					height: 0;
				}
				
				&.active{
					border-color: $uni-color-primary;
				}
			}
		}
	}
</style>
