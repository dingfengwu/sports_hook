<template>
	<view class="my-container">
		<uni-nav-bar :title="$t('my.title')" :shadow="false" :border="false"></uni-nav-bar>
		
		<profit-summary></profit-summary>
		
		<uni-list :border="false">
			<uni-list-item :clickable="true" :title="$t('my.promosLink')" :show-extra-icon="true"
				:extra-icon="{color: '#999',size: '22',class: 'iconfont icon-lianjie'}" thumb-size="lg" v-if="false"></uni-list-item>
		</uni-list>
		
		<view class="exit">
			<button type="warn" @click="logout">{{$t("account.exit")}}</button>
		</view>
		
		<bottom-menu current="3"></bottom-menu>
	</view>
</template>

<script>
	import profitSummary from "../../components/my/profit-summary.vue";
	import bottomMenu from "../../components/common/bottom-menu.vue";

	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			profitSummary,
			bottomMenu
		},
		computed: {
			...mapGetters(["isLogin"])
		},
		methods: {
			...mapActions(["logout"])
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {
		.exit{
			margin-top: 30upx;
		}
	}
</style>
