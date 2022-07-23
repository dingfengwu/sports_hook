<script>
	import {
		mapActions
	} from 'vuex';
	//import pageAnimation from './components/page-animation'
	import {
		setSystemTheme,
		getClientType
	} from './common/js/util/util.js';
	import {
		config
	} from './common/js/config.js';
	import {
		CLIENT_H5,
		CLIENT_PC,
		APP_ID_HOOK
	} from './common/js/util/const.js';
	import {showWindow} from "./common/js/router/animation.js"

	export default {
		//mixins: [pageAnimation],
		onLaunch(){
			showWindow();
		},
		methods: {
			...mapActions(['getHomeConfigVersion', 'getLotteryConfigVersion', 'getSystemConfig', 'getUserInfo','getMessageCount', 'setAppId'
			]),
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
		},
		onHide: function() {
			console.log('App Hide');
		},
		created() {
			this.setAppId(APP_ID_HOOK);
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
<style lang="scss">
	@import "./common/css/theme.scss";
	
	uni-page-body {
		height: 100%;
	}

	.bottom-menu {
		position: absolute !important;
	}
	
	.uni-navbar__header{
		@include background-color;
		color: #fff !important;
		
		.uni-nav-bar-text{
			color: #fff !important;
		}
	}
	
	.segmented-control__item{
		@include light-border-color;
		
		.segmented-control__text{
			@include primary-text-color;
		}
		
		&.segmented-control__item--button--active{
			@include background-color;
			
			.segmented-control__text{
				color: #fff !important;
			}
		}
	}
	
</style>
