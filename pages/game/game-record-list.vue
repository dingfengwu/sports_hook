<template>
	<view class="game-record-list-container">
		<uni-nav-bar :title="$t('gameRecord.title')" :shadow="false" :border="false"></uni-nav-bar>
		<track-order-list></track-order-list>
		<bottom-menu current="1"></bottom-menu>
	</view>
</template>

<script>
	import trackOrderList from "../../components/hook/track-order-list.vue";
	import bottomMenu from "../../components/common/bottom-menu.vue";

	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			trackOrderList,
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
	.game-record-list-container {
		height: 100%;
	}
</style>
