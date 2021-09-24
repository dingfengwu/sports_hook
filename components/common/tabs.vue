<template>
	<view class="tabs">
		<wuc-tab :tab-list="tabList" :tabCur.sync="currentTab" @change="tabChanged"></wuc-tab>
		<swiper :current="currentTab" duration="300" @change="swiperChanged">
			<swiper-item v-for="(item,index) in tabList" :key="index">
				<scroll-view-infinity-load @refresh="refreshData" @load="loadData" :load-completed="loadCompleted"
					:show-completed="showCompleted">
					<slot></slot>
				</scroll-view-infinity-load>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import wucTab from "../../components/common/wuc-tab.vue"
	import scrollViewInfinityLoad from "../../components/common/scroll-view-infinity-load.vue"

	export default {
		props: ["tabList", "loadCompleted", "showCompleted"],
		components: {
			wucTab,
			scrollViewInfinityLoad
		},
		data() {
			return {
				currentTab: 0
			}
		},
		methods: {
			tabChanged(index) {
				//console.log("tabs","tab changed",index);
				this.currentTab = index;
				this.$emit("tabChanged", index);
			},
			swiperChanged(e) {
				//console.log("tabs","swiper changed",e);
				this.currentTab = e.detail.current;
				this.$emit("tabChanged", e.detail.current);
			},
			refreshData() {
				this.$emit("refresh");
			},
			loadData() {
				if (!this.loadCompleted) {
					this.$emit("load");
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		flex: 1;
		display: flex;
		flex-direction: column;

		/deep/ uni-swiper {
			flex: 1;
		}

		/deep/ .wuc-tab {
			text-align: center;
		}

		/deep/ .wuc-tab {
			.uni-scroll-view-content {
				>div {
					display: flex;
					justify-content: space-between;
				}
				
				.wuc-tab-item{
					flex: 1;
				}
			}
		}
	}
</style>
