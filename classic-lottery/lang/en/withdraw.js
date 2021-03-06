export default {
  serialNumber: "Serial Number",
  accountName: "Account",
  username: "Username",
  bankAccount: "Account Name",
  withdralAmount: "Amount",
  fundPassword: "Fund password",
  realName: "Real Name",
  userWithdrawInfo1: "Dear",
  collectionAccount: "Please select the receiving account",
  withdrawAmount: "Withdrawal Amount",
  nextStep: "Next step",
  userWithdrawInfo2:
    "You are now withdrawing to your bank card <br/>the current account can withdraw the balance：",
  amountIsEmpty: "The withdrawal amount cannot be empty",
  fundPasswordIsEmpty: "Fund password cannot be empty",
  withdrawSuccessInfo:
    "The withdrawal application has been submitted, you can check the status in [{msg}]",
  prohibitAmountNotice: "{currency_unit} <br/> Non-withdrawable balance:",
  withdrawNotice:
    "Withdrawal account number: {bankName}({account}), withdrawal amount: {amount}",
  confirmWithdraw: "Confirm withdrawal",
  refuseReason: "Reason for rejection",
  tips: "<h1>Intimate reminder:</h1><li>The minimum withdrawal amount for a single transaction is <i>{withdraw_min_amount}</i> {currency_unit},The maximum withdrawal amount is <i>{withdraw_max_amount}</i> {currency_unit}. </li><li><span class='{css}'>Free withdrawals <i>{fee_times}</i> times every day, starting from the <i>{withdraw_times}</i> times, you will be charged <i>{rate}%</i> If any inconvenience is caused, please understand, thank you!</span> Number of withdrawals made today: <i>{current_times}/{max_times}</i></li><li class='{css_time}'>Daily withdrawal time is <i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<h1>Intimate reminder:</h1><li>The maximum withdrawal amount for a single transaction is <i>{amount}</i>. </li><li>You can withdraw <i>{max_times}</i> times a day. Withdrawals below <i>{min_amount}</i> will deduct a handling fee of <i>{fixed_fee}</i> rupees, and withdrawals above <i>{min_amount}</i> will deduct a <i>{rate}%</i> handling fee.</li>",
  tips2:
    "<h1>Intimate reminder：</h1><li>The maximum withdrawal amount for a single transaction is <i>{amount}</i>。</li><li>You can withdraw <i>{max_times}</i> times a day.Withdrawals will deduct a <i>{rate}％</i> handling fee and <i>{fixed_service_fee}</i> rupees service fee.Your withdrawal will arrive within <i>{complete_hours}</i> hours.</li>",
  tipTmpl:
    "<h1>Intimate tips:</h1><li>The minimum single withdrawal is <i>{withdraw_min_amount}</i>{currency_unit}, and the maximum is <i>{withdraw_max_amount}</i>{currency_unit}. </li><li>You can withdraw funds <i>{max_times}</i> times a day, <span class='{css}'> where you can withdraw funds for free<i>{fee_times}</i >times</span></li>",
  tipTmpl1:
    "Withdrawal less than <i>{amount}</i> will deduct the handling fee of <i>{value}</i>{value_unit};",
  tipTmpl2:
    "Withdrawals greater than or equal to <i>{min_amount}</i> and less than <i>{max_amount}</i> will be deducted from the handling fee of <i>{value}</i>{value_unit};",
  tipTmpl3:
    "Withdrawals greater than or equal to <i>{amount}</i> will deduct the handling fee of <i>{value}</i>{value_unit}.",
  tipTmpl4:
    "<i>{value}</i>{value_unit} handling fee will be deducted for {channel_type} withdrawals.",
  noticeOfGettingU:
    "{source_currency_unit},Equivalent to {amount} {target_currency_unit}",
  tipTmpl5: "<li>Withdrawal arrival time: within 24 hours</li>",
  tipType1: "Bank Card",
  tipType2: "USDT",
};
