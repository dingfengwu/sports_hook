import Vue from 'vue'
import App from './App'
import i18n from "./lang";
//process.env.NODE_ENV === 'development' && require("./common/js/mock/index");
import {
	registerConstant,
	registerFilters,
	registerGlobalVariable,
	registerComponents
} from "./common/js/util/main.js"
import {
	router,
	RouterMount
} from './common/js/router/index.js';

//仅H5引入
import "./common/js/util/popup.js";
//仅PC引入
//import popup from "./components/index.js";
//Vue.use(popup);

import './common/css/icon-font/iconfont.css';
import './common/css/all.scss';


Vue.config.productionTip = false;
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


// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

export default app;
