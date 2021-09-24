<template>
	<view class="notice-detail">
		<uni-nav-bar left-icon="back" :title="$t('home.titleNoticeDetail')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back">
		</uni-nav-bar>

		<content-detail :title="currentNotice.title" :sub-title="currentNotice.created_at" :content="currentNotice.content"></content-detail>
	</view>
</template>

<script>
	import contentDetail from "../../components/common/content-detail.vue";
	import {mapGetters,mapActions} from "vuex";

	export default {
		components: {
			contentDetail
		},
		data() {
			return {

			}
		},
		computed:{
			...mapGetters(["currentNotice"])
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
