<template>
	<view class="my-container">
		<uni-nav-bar :title="$t('my.title')" :shadow="false" :border="false"></uni-nav-bar>
		<profit-summary></profit-summary>
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
		},
		onShow() {
			//仅挂机存在,因为在pages.json文件中未配置meta
			if (!this.isLogin) {
				this.logout();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {}
</style>
