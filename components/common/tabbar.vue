<template>
	<view class="tabbar" :style="{'background-color':backgroundColor}">
		<block v-for="(item,index) in tabList" :key="index">
			<view class="navigator" :class="{'on':currentTabIndex == index,middle:middleItemIndex===index}"
				@tap="switchTab(index)">
				<view class="icon">
					<text class="iconfont" :class="item.icon"
						:style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
					<text v-if="item.badge" class="uni_badge">{{item.badge}}</text>
					<text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
				</view>
				<view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">
					{{item.text}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTabIndex: this.current
			}
		},
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			backgroundColor: {
				type: String,
				default: '#3a3a3a'
			},
			color: {
				type: String,
				default: '#fff'
			},
			tintColor: {
				type: String,
				default: '#42b983'
			},
			tabList: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		computed: {
			middleItemIndex() {
				if (this.tabList.length % 2 === 1) {
					return parseInt(this.tabList.length / 2);
				}
				return -1;
			}
		},
		methods: {
			switchTab(index) {
				this.currentTabIndex = index
				this.$emit('click', index);

				let url = this.tabList[index].url;
				if (url) {
					this.$push(url);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../common/css/theme.scss";
	
	.tabbar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10upx 0upx 10upx 0upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		//border-top: solid 2upx #ccc;
		line-height: 1.1;
		font-size: 1em;

		.navigator {
			text-align: center;
			flex-basis: 20%;
			cursor: pointer;

			&.middle {
				margin-top: -30upx;

				.iconfont {
					font-size: 3em;
					//border: solid 2upx #ccc;
					padding: 10upx;
					border-radius: 80upx;
					background-color: #3a3a3a;
					border-bottom: 0;
					border-left: 0;
					border-right: 0;
				}
			}

			&.on {
				/deep/ uni-text,/deep/ uni-view {
					@include light-text-color;
					//color: #34d585 !important;
				}
			}
		}

		.iconfont {
			font-size: 2em;
		}
	}
</style>
