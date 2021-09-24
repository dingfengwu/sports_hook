<template>
	<view class="agent">
		<uni-nav-bar left-icon="back" :title="$t('agent.agentCenter')" shadow="false" :right-text="$t('agent.rules')"
			backgroundColor="transparent" @clickLeft="$back" @clickRight="openRule"></uni-nav-bar>
		<index-header></index-header>
		<index-team></index-team>
		<index-link></index-link>

		<button class="circle bottom" type="primary" @click="goToGame">{{$t("agent.goEarn")}}</button>

		<uni-popup ref="rule_popup" type="center" :animation="false">
			<view class="rule-popup">
				<view class="title">代理规则</view>
				<view class="body">sdfasdfaasasdfasdfasdfadsasdfadssdfasdfasfasdfa</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import indexHeader from "../../components/agent/index-header.vue";
	import indexTeam from "../../components/agent/index-team.vue";
	import indexLink from "../../components/agent/index-link.vue";

	export default {
		components: {
			indexHeader,
			indexTeam,
			indexLink
		},
		data() {
			return {

			};
		},
		methods: {
			openRule() {
				this.$refs["rule_popup"].open();
			},
			goToGame(){
				this.$push("/pages/game/index");
			}
		},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.agent {
		padding-bottom: 100upx;
		
		button.bottom {
			margin-top: 100upx;
		}
	}

	.rule-popup {
		background-color: #fff;
		padding: 40upx;
		border-radius: 20upx;
		margin: 20upx;

		.title {
			text-align: center;
			padding: 10upx;
		}

		.body {
			line-height: 1.4;
			word-break: break-all;
		}
	}

	/deep/ .uni-navbar-header-btns {
		.uni-icons {
			color: #fff !important;
		}
	}

	/deep/ .uni-navbar-header {
		color: #fff !important;
	}

	uni-page-body {
		background-image: url(../../static/common/green-header.png);
		background-repeat: no-repeat;
		background-position: top;
	}
</style>
