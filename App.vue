<script>
	import {
		mapActions
	} from "vuex";
	import pageAnimation from './components/page-animation'
	import axios from "axios";
	import {
		setSystemTheme
	} from "./common/js/util/util.js";
	
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
			setSystemTheme();
			//this.getHomeConfigVersion();
			this.getLotteryConfigVersion().then(res => {
				this.getSystemConfig();
				this.getUserInfo();
				//this.getMessageCount();
				this.getLotteryMenuList();
			});

			///api?action=GetMatchList&match_id=&status=0&date[]=2021-09-24&date[]=2021-09-25&page=1&pagesize=10&terminal_id=1&lang=zh-CN
			// axios({
			// 	url: "/api",
			// 	method: "GET",
			// 	params: {
			// 		action: "GetMatchList",
			// 		match_id: "",
			// 		status: 0,
			// 		date: ["2021-09-24", "2021-09-25"],
			// 		page: 1,
			// 		pagesize: 10,
			// 		terminal_id: 1,
			// 		lang: "zh-CN"
			// 	}
			// }).then(res => {
			// 	console.log(res, "mock res");
			// });
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
