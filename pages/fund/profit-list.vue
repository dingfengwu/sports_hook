<template>
	<view class="profit-list-container">
		<uni-nav-bar :title="$t('home.goGameRecord')" :shadow="false" :border="false"></uni-nav-bar>
		<profit-list></profit-list>
		<bottom-menu current="2"></bottom-menu>
	</view>
</template>

<script>
	import profitList from "../../components/hook/profit-list.vue"
	import bottomMenu from "../../components/common/bottom-menu.vue";

	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			profitList,
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
	.profit-list-container {
		height: 100%;
	}
</style>
