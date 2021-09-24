import axios from './axios.js'

export const getDepositPlatformList = () => {
	return axios({
		params: {
			action: "getDepositPlatformList"
		}
	})
}
export const deposit = ({
	platformId,
	accountId,
	bankId,
	amount,
	name,
	documentId
}) => {
	return axios({
		params: {
			platform_id: platformId,
			bank_id: bankId,
			account_id: accountId,
			amount: amount,
			action: "deposit",
			name: name,
			document_id: documentId
		}
	});
}
export const getBankCardList = () => {
	return axios({
		params: {
			action: "getBankCardList"
		}
	})
}
export const withdraw = ({
	fundPassword,
	amount,
	bankCardId
}) => {
	return axios({
		method: "post",
		data: {
			action: "withdraw",
			fund_password: fundPassword,
			amount: amount,
			bankcard_id: bankCardId
		}
	})
}
export const getBankList = () => {
	return axios({
		params: {
			action: "getBankList"
		}
	})
}
export function bindBankCard({
	bankId,
	provinceId,
	cityId,
	accountName,
	accountNumber,
	branch,
	ifsc,
	email,
	mobile,
	cpf,
	iban,
	branchCode,
	sortCode,
	paymentMethod,
	accountType,
	paymentAddress,
	cardDigit,
	documentId,
	gender,
	fundPassword,
	checkToken,
	city,
	address,
}) {
  return axios({
    method: "post",
    data: {
      action: "bindBankCard",
      bank_id: bankId,
      province_id: provinceId,
      city_id: cityId,
      account_name: accountName,
      account: accountNumber,
      branch: branch,
      ifsc: ifsc,
      email: email,
      mobile: mobile,
      cpf: cpf,
      iban: iban,
      sort_code: sortCode,
      branch_code: branchCode,
      payment_method: paymentMethod,
      account_type: accountType,
      payment_address: paymentAddress,
      card_digit: cardDigit,
      document_id: documentId,
      gender: gender,
	  city:city,
	  address:address,
	  fund_pwd: fundPassword,
	  checked_token: checkToken,
    }
  });
}