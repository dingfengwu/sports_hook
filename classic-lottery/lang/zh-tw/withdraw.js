export default {
  serialNumber: "取款流水號",
  accountName: "戶名",
  username: "用戶名",
  bankAccount: "收款帳號",
  withdralAmount: "提現金額",
  fundPassword: "資金密碼",
  realName: "真實姓名",
  userWithdrawInfo1: "尊敬的",
  collectionAccount: "請選擇收款賬號",
  withdrawAmount: "提現金額",
  nextStep: "下一步",
  userWithdrawInfo2: "，您的余額信息如下：<br/>可提現余額：",
  amountIsEmpty: "提款金額不能爲空",
  fundPasswordIsEmpty: "資金密碼不能爲空",
  withdrawSuccessInfo: "提現申請已經提交,您可在【{msg}】中查詢狀態",
  prohibitAmountNotice: "{currency_unit} <br />不可提現金額：",
  withdrawNotice: "提現賬號: {bankName}({account}}, 提現金額: {amount}",
  confirmWithdraw: "確認提現",
  refuseReason: "拒絕理由",
  tips: "<h1>貼心提示：</h1><li>單筆最高可提現<i>{amount}</i>{currency_unit}。</li><li><span class='{css}'>每天免費取款<i>{fee_times}</i>次，第<i>{withdraw_times}</i>次起將收取<i>{rate}%</i>的費用，如有造成不便，敬請諒解，謝謝！</span>今日已提現次數：<i>{current_times}/{max_times}</i></li><li class='{css_time}'>每天提現時間爲<i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<h1>貼心提示：</h1><li>單筆交易的最大提款金額爲<i>{amount}</i>。</li><li>您每天可以提款<i>{max_times}</i>次。低于<i>{min_amount}</i>的提款將扣除<i>{fixed_fee}</i>盧比的手續費，而高于<i>{min_amount}</i>的提款將扣除<i>{rate}％</i>的手續費。</li>",
  tips2:
    "<h1>貼心提示：</h1><li>單筆交易的最大提款金額爲<i>{amount}</i>。</li><li>您每天可以提款<i>{max_times}</i>次。提款將扣除<i>{rate}％</i>的手續費加<i>{fixed_service_fee}</i>盧比的服務費。您的提款將在<i>{complete_hours}</i>小時內到帳。</li>",
  tipTmpl:
    "<h1>貼心提示：</h1><li>單筆提現最低<i>{withdraw_min_amount}</i>{currency_unit}，最高<i>{withdraw_max_amount}</i>{currency_unit}。</li><li>您每天共可以提款<i>{max_times}</i>次<span class='{css}'>，其中可免費取款<i>{fee_times}</i>次</span><span class='{css_time}'>，每天提現時間爲<i>{withdraw_allowed_time}</i></span>。</li>",
  tipTmpl1:
    "低于<i>{amount}</i>的提款將扣除<i>{value}</i>{value_unit}的手續費；",
  tipTmpl2:
    "大于等于<i>{min_amount}</i>，且小于<i>{max_amount}</i>的提款將扣除<i>{value}</i>{value_unit}的手續費；",
  tipTmpl3:
    "大于等于<i>{amount}</i>的提款將扣除<i>{value}</i>{value_unit}的手續費。",
  tipTmpl4: "所有{channel_type}提款將扣除<i>{value}</i>{value_unit}的手續費。",
  noticeOfGettingU: "{source_currency_unit},等於{amount}{target_currency_unit}",
  tipType1: "銀行卡",
  tipType2: "USDT",
};
