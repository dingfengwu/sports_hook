const LOTTERY_CONFIG = "LOTTERY_CONFIG";
const LOTTERY_MENU = "LOTTERY_MENU";
const LANG = "LANG";
const SYSTEM_CONFIG = "SYSTEM_CONFIG";

export const getLotteryConfig = () => {
	try {
		let config = uni.getStorageSync(LOTTERY_CONFIG);
		if (config) return JSON.parse(config);
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setLotteryConfig = (val) => {
	try {
		let data = JSON.stringify(val);
		uni.setStorageSync(LOTTERY_CONFIG, data);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const setLotteryMenu = (val) => {
	try {
		let data = JSON.stringify(val);
		uni.setStorageSync(LOTTERY_MENU, data);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const getLotteryMenu = () => {
	try {
		let menu = uni.getStorageSync(LOTTERY_MENU);
		if (menu) return JSON.parse(menu);
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const getLang = () => {
	try {
		let lang = uni.getStorageSync(LANG);
		return lang;
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setLang = (val) => {
	try {
		uni.setStorageSync(LANG, val);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}

export const getSystemConfigCache = () => {
	try {
		let systemConfig = uni.getStorageSync(SYSTEM_CONFIG);
		if (systemConfig) return JSON.parse(systemConfig);
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setSystemConfigCache = (val) => {
	try {
		let data=JSON.stringify(val);
		uni.setStorageSync(SYSTEM_CONFIG, data);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
