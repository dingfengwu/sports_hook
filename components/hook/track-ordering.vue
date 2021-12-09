<template>
	<view class="track-ordering">
		<match-list v-if="taskStatus"></match-list>
		<empty-list v-else></empty-list>
	</view>
</template>

<script>
	import matchList from "../../components/hook/match-list.vue";
	import emptyList from "../../components/common/empty-list.vue";
	import {
		mapGetters,
		mapActions
	} from "vuex";

	export default {
		components: {
			matchList,
			emptyList
		},
		computed: {
			...mapGetters(["taskStatus"])
		}
	}
</script>

<style lang="scss" scoped>
	.track-ordering {
		height: calc(100% - 72upx);
		
		/deep/ .match-list{
			height: 100%;
		}
	}
</style>
