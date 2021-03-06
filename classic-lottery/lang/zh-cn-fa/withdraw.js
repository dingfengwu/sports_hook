export default {
  serialNumber: "取款流水号",
  accountName: "户名",
  username: "用户名",
  bankAccount: "收款帐号",
  withdralAmount: "提现金额",
  fundPassword: "资金密码",
  realName: "真实姓名",
  userWithdrawInfo1: "尊敬的",
  collectionAccount: "请选择收款账号",
  withdrawAmount: "提现金额",
  nextStep: "下一步",
  userWithdrawInfo2: "，您的余额信息如下：<br/>可提现余额：",
  amountIsEmpty: "提款金额不能为空",
  fundPasswordIsEmpty: "资金密码不能为空",
  withdrawSuccessInfo: "提现申请已经提交,您可在【{msg}】中查询状态",
  prohibitAmountNotice: "{currency_unit} <br />不可提现金额：",
  withdrawNotice: "提现账号: {bankName}({account}), 提现金额: {amount}",
  confirmWithdraw: "确认提现",
  refuseReason: "拒绝理由",
  tips: "<h1>贴心提示：</h1><li>单笔最高可提现<i>{amount}</i>{currency_unit}。</li><li><span class='{css}'>每天免费取款<i>{fee_times}</i>次，第<i>{withdraw_times}</i>次起将收取<i>{rate}%</i>的费用，如有造成不便，敬请谅解，谢谢！</span>今日已提现次数：<i>{current_times}/{max_times}</i></li><li class='{css_time}'>每天提现时间为<i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<h1>贴心提示：</h1><li>单笔交易的最大提款金额为<i>{amount}</i>。</li><li>您每天可以提款<i>{max_times}</i>次。低于<i>{min_amount}</i>的提款将扣除<i>{fixed_fee}</i>卢比的手续费，而高于<i>{min_amount}</i>的提款将扣除<i>{rate}％</i>的手续费。</li>",
  tips2:
    "<h1>贴心提示：</h1><li>单笔交易的最大提款金额为<i>{amount}</i>。</li><li>您每天可以提款<i>{max_times}</i>次。提款将扣除<i>{rate}％</i>的手续费加<i>{fixed_service_fee}</i>卢比的服务费。您的提款将在<i>{complete_hours}</i>小时内到帐。</li>",
  tipTmpl:
    "<h1>贴心提示：</h1><li>单笔提现最低<i>{withdraw_min_amount}</i>{currency_unit}，最高<i>{withdraw_max_amount}</i>{currency_unit}。</li><li>您每天可以提款<i>{max_times}</i>次，今日已经提款<i>{current_times}</i>次<span class='{css}'>，其中可免费取款<i>{fee_times}</i>次</span><span class='{css_time}'>，每天提现时间为<i>{withdraw_allowed_time}</i></span>。</li>",
  tipTmpl1:
    "低于<i>{amount}</i>的提款将扣除<i>{value}</i>{value_unit}的手续费；",
  tipTmpl2:
    "大于等于<i>{min_amount}</i>，且小于<i>{max_amount}</i>的提款将扣除<i>{value}</i>{value_unit}的手续费；",
  tipTmpl3:
    "大于等于<i>{amount}</i>的提款将扣除<i>{value}</i>{value_unit}的手续费。",
  tipTmpl4: "所有{channel_type}提款将扣除<i>{value}</i>{value_unit}的手续费。",
  noticeOfGettingU:
    "{source_currency_unit},相当于{amount}{target_currency_unit}",
  tipType1: "银行卡",
  tipType2: "USDT",
};
