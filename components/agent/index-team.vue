<template>
	<view class="team">
		<view class="title">
			<view>{{$t("agent.myTeam")}}</view>
			<view class="more">{{$t("common.more")}}</view>
		</view>
		<view class="man"><i>{{teamCount}}</i>{{$t("agent.manUnit")}}</view>
		<view class="man-count">
			<view class="item">
				<view class="value">{{manAddedToday}}</view>
				<view>{{$t("agent.manAdded")}}</view>
			</view>
			
			<view class="item">
				<view class="value">{{manActived}}</view>
				<view>{{$t("agent.manActived")}}</view>
			</view>
			
			<view class="item">
				<view class="value">{{teamLevel}}</view>
				<view>{{$t("agent.teamLevel")}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				teamCount:100,
				manAddedToday:0,
				manActived:20,
				teamLevel:2
			}
		}
	}
</script>

<style lang="scss" scoped>
	.team{
		margin: 60upx 30upx;
		padding: 40upx;
		background-color: #fff;
		border-radius: 20upx;
		
		.title{
			view:first-child{
				float: left;
				font-size: 1.1em;
			}
			
			.more{
				float: right;
				color: #555;
				padding: 20upx;
				font-size: 0.8em;
			}
		}
		
		.man{
			clear: both;
			
			i{
				font-size: 2em;
				font-style: normal;
				font-weight: 700;
			}
		}
		
		.man-count{
			display: flex;
			justify-content: space-between;
			margin-top: 40upx;
			
			.item{
				text-align: center;
				font-size: 0.8em;
				line-height: 1.5;
				
				.value{
					font-size: 1.5em;
				}
			}
		}
	}
</style>
