<template>
	<tabbar :tabList="bottomNavList" :current="current"></tabbar>
</template>

<script>
	import tabbar from "../../components/common/tabbar.vue"
	import {
		config
	} from "../../common/js/config.js"

	export default {
		props:["current"],
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

<style>
</style>
