import Vue from 'vue'
import Vuex from 'vuex'
import account from './modules/account.js'
import config from './modules/config.js'
import fund from './modules/fund.js'
import game from './modules/game.js'
import tools from "./modules/tools.js"
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		account,
		config,
		fund,
		game,
		tools
	}
});
