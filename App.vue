<script>
	import {
		mapActions
	} from "vuex";
	import pageAnimation from './components/page-animation'

	export default {
		mixins: [pageAnimation],
		methods: {
			...mapActions(["getHomeConfigVersion", "getLotteryConfigVersion", "getSystemConfig", "getUserInfo",
				"getMessageCount", "getLotteryMenuList"
			])
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			console.log("created app");
			//this.getHomeConfigVersion();
			this.getLotteryConfigVersion().then(res => {
				this.getSystemConfig();
				this.getUserInfo();
				//this.getMessageCount();
				this.getLotteryMenuList();
			});
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
