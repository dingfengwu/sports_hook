import Vue from "vue";
import VueI18n from "vue-i18n";
import {
	getLang
} from "../common/js/cache/config.js"

import zhCnLocale from "./zh-cn";

Vue.use(VueI18n);

export const messages = {
	"zh-CN": {
		...zhCnLocale
	}
};
export const getLangList = () => {
	return Object.keys(messages);
};

const i18n = new VueI18n({
	locale: getLang() || window.config.lang,
	messages,
	silentTranslationWarn: true
});
export default i18n;
