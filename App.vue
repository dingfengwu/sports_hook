<script>
import { mapActions } from 'vuex';
//import pageAnimation from './components/page-animation'
import { setSystemTheme, getClientType } from './common/js/util/util.js';
import { config } from './common/js/config.js';
import { CLIENT_H5, CLIENT_PC } from './common/js/util/const.js';

export default {
	//mixins: [pageAnimation],
	methods: {
		...mapActions(['getHomeConfigVersion', 'getLotteryConfigVersion', 'getSystemConfig', 'getUserInfo', 'getMessageCount', 'getLotteryMenuList']),
		adapteClient() {
			let client = getClientType();
			if (client === CLIENT_PC) {
				//调整body
				document.body.style.overflow = 'hidden';
				document.body.style.width = '500px';
				document.body.style.height = '100vh';
				document.body.style.margin = '0 auto';
				document.documentElement.style.backgroundColor = '#333';
				
				//调整viewport
				let viewport = document.getElementById("viewport");
				viewport.content = "width=375,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0";
			}
		}
	},
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
		document.title = config.title;
	},
	onHide: function() {
		console.log('App Hide');
	},
	created() {
		this.adapteClient();
		setSystemTheme();
		//this.getHomeConfigVersion();
		this.getLotteryConfigVersion().then(res => {
			this.getSystemConfig();
			this.getUserInfo();
			//this.getMessageCount();
			//this.getLotteryMenuList();
		});
	}
};
</script>
