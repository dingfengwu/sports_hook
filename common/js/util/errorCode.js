export const errorCode = {
	captchaError: 8023,
	loginTimeout: 3004,
	invalidToken: 2020
};
export const isInvalidLogin = (code) => {
	if (code === errorCode.loginTimeout || code === errorCode.invalidToken) return true;
	return false;
}
