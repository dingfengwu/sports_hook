const ACCOUNT_TOKEN = "ACCOUNT_TOKEN";
const ACCOUNT_IS_LOGIN = "ACCOUNT_IS_LOGIN";
const BALANCE_STATE = "BALANCE_STATE";
const USER_INFO = "USER_INFO";

export const getToken = () => {
	try {
		let token = uni.getStorageSync(ACCOUNT_TOKEN);
		if (token) return token;
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setToken = (val) => {
	try {
		uni.setStorageSync(ACCOUNT_TOKEN, val);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const getIsLogin = () => {
	try {
		let isLogin = uni.getStorageSync(ACCOUNT_IS_LOGIN);
		if (isLogin) return isLogin;
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setIsLogin = (val) => {
	try {
		uni.setStorageSync(ACCOUNT_IS_LOGIN, val);
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const clearAll = () => {
	try {
		uni.clearStorageSync();
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const setBalanceState = (data) => {
	try {
		uni.setStorageSync(BALANCE_STATE, JSON.stringify(data));
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const getBalanceState = () => {
	try {
		let data = uni.getStorageSync(BALANCE_STATE);
		if (data) {
			return JSON.parse(data);
		}
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
export const setUserInfoCache = (data) => {
	try {
		uni.setStorageSync(USER_INFO, JSON.stringify(data));
		return true;
	} catch (e) {
		console.error(e);
	}
	return false;
}
export const getUserInfoCache = () => {
	try {
		let data = uni.getStorageSync(USER_INFO);
		if (data) return JSON.parse(data);
	} catch (e) {
		console.error(e);
	}
	return undefined;
}
