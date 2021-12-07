<template>
	<tabbar :tabList="bottomNavList" :current="current" class="bottom-menu"></tabbar>
</template>

<script>
	import tabbar from "../../components/common/tabbar.vue"
	import {
		config
	} from "../../common/js/config.js"

	export default {
		props: ["current"],
		components: {
			tabbar
		},
		data() {
			return {
				bottomNavList: config.bottomMenu
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-menu{
		/deep/ .text{
			white-space: nowrap;
		}
	}
</style>
