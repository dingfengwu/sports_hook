import Vue from 'vue'
import App from './App'
import i18n from "./lang";
import {
	registerConstant,
	registerFilters,
	registerGlobalVariable,
	registerComponents
} from "./common/js/util/main.js"
import "./common/js/util/popup.js";


import './common/css/all.scss';


Vue.config.productionTip = false

registerFilters(Vue);
registerGlobalVariable(Vue);
registerConstant(Vue);
registerComponents(Vue);

App.mpType = 'app'
var el = document.getElementById("app");
export const app = new Vue({
	i18n,
	...App
});
app.$mount(el);


export default app;
