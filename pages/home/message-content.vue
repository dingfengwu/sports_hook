<template>
	<view class="message-detail">
		<uni-nav-bar left-icon="back" :title="$t('home.titleMessageDetail')" shadow="false" backgroundColor="transparent"
			@clickLeft="$back">
		</uni-nav-bar>

		<content-detail :title="currentMessage.title" :sub-title="currentMessage.created_at" :content="currentMessage.content"></content-detail>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from "vuex";
	import contentDetail from "../../components/common/content-detail.vue"
	
	export default {
		components:{contentDetail},
		data() {
			return {
				
			}
		},
		computed:{
			...mapGetters(["currentMessage"])
		},
		methods: {
			...mapActions(["readMessage"])
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
