<template>
	<view class="my-basic-container">
		<uni-list :border="false">
			<uni-list-item :clickable="true" link to="/pages/account/update-login-password" :title="$t('my.loginPassword')" :show-extra-icon="true"
				:extra-icon="{color: '#999',size: '22',type: 'locked'}" thumb-size="lg"></uni-list-item>
			<uni-list-item :clickable="true" link to="/pages/account/update-fund-password" :title="$t('my.withdrawPassword')" :show-extra-icon="true"
				:extra-icon="{color: '#999',size: '22',type: 'locked'}" thumb-size="lg"></uni-list-item>
			<uni-list-item :clickable="true" link to="/pages/fund/bank-card-list" :title="$t('my.withdrawAccount')" :show-extra-icon="true"
				:extra-icon="{color: '#999',size: '22',type: 'bars'}" thumb-size="lg"></uni-list-item>
			<uni-list-item :clickable="true" link to="/pages/agent/index" :title="$t('my.agentCenter')" :show-extra-icon="true"
				:extra-icon="{color: '#999',size: '22',type: 'sound'}" thumb-size="lg"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.my-basic-container {
		margin: 90upx 0;
		padding: 30upx;
		border-radius: 20upx;
		background-color: #fff;
	}
</style>
