const qs = require('qs')

//监听键盘返回
window.apiready = function() {
	if (window.api) {
		window.api.addEventListener({
				name: "keyback"
			},
			function(ret, err) {
				var pages = getCurrentPages();
				var page = (pages[pages.length - 1]).route;
				if (page.indexOf("view/main/index") >= 0) return;
				uni.navigateBack();
			}
		);
	}
};

export const push = (url, data) => {
	let urls = url
	if (data !== undefined && typeof data !== String) {
		urls = `${url}?${qs.stringify(data)}`
	}
	uni.navigateTo({
		url: urls,
		"animationType": "slide-in-left",
		"animationDuration": 300,
		fail: (err) => {
			console.warn(err);
			uni.switchTab({
				url: url
			})
		}
	})
};

export const back = () => {
	let pageStack = getCurrentPages();
	if (pageStack.length > 1) {
		uni.navigateBack({
			delta: 1
		});
	} else {
		uni.switchTab({
			url: "/pages/home/index"
		})
	}
}
