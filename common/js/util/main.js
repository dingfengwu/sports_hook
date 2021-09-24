import Promise from "promise-polyfill";
import promise from "es6-promise";
import store from '../../../store/index.js'
import * as filters from "../filters";
import * as consts from "./const";
import {
	push,
	back
} from "./router.js"

//全局组件
import bottomMenu from "../../../components/common/bottom-menu.vue";
import VueClipboard from "vue-clipboard2";

export const registerFilters = (vue) => {
	Object.keys(filters).forEach(key => {
		vue.filter(key, filters[key]);
	});
}

export const registerGlobalVariable = (vue) => {
	promise.polyfill();
	window.Promise = Promise;

	vue.prototype.$store = store;
	vue.prototype.$push = push;
	vue.prototype.$back = back;
}

export const registerConstant=(vue)=>{
	Object.keys(consts).forEach(key => {
		Object.defineProperty(vue,`$${key}`,{
			value:consts[key]
		});
	});
};

function plugins(vue){
	vue.component("bottom-menu",bottomMenu);
}
export const registerComponents=(vue)=>{
	vue.use(plugins);
	vue.use(VueClipboard);
}