import Vue from 'vue'
import i18n from "../../../lang/index.js"

const confirm = (content, onConfirm, onCancel) => {
	uni.showModal({
		title: i18n.t("common.titleConfirm"),
		content,
		showCancel: true,
		confirmText: i18n.t("common.popupButtonConfirm"),
		cancelText: i18n.t("common.popupButtonCancel"),
		success: res => {
			console.log(res);
			if (res.confirm) {
				onConfirm()
			} else if (res.cancel) {
				if (onCancel) {
					onCancel()
				}
			}
		}
	});
}

const message = (content, onConfirm) => {
	uni.showModal({
		title: i18n.t("common.titleInformation"),
		content,
		showCancel: false,
		confirmText: i18n.t("common.popupButtonConfirm"),
		success: res => {
			if (res.confirm && onConfirm) {
				onConfirm()
			}
		}
	});
}

const showLoading = () => {
	uni.showLoading({
		title: i18n.t("common.dataLoading")
	});
}
const hideLoading = () => {
	uni.hideLoading();
}

Vue.prototype.$confirm = confirm;
Vue.prototype.$message = message;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;
