<script>
	import {
		mapActions
	} from "vuex";
	//import pageAnimation from './components/page-animation'
	import {
		setSystemTheme
	} from "./common/js/util/util.js";
	import {
		config
	} from "./common/js/config.js";
	
	export default {
		//mixins: [pageAnimation],
		methods: {
			...mapActions(["getHomeConfigVersion", "getLotteryConfigVersion", "getSystemConfig", "getUserInfo",
				"getMessageCount", "getLotteryMenuList"
			])
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show');
			document.title = config.title;
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
		}
	}
</script>