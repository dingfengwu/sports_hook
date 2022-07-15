export default {
  serialNumber: "Đơn rút tiề",
  accountName: "Toname",
  username: "tên người dùng",
  bankAccount: "Tài khoản hóa đơn",
  withdralAmount: "Số tiền",
  fundPassword: "Mật khẩu rút tiền",
  realName: "Tên thật",
  userWithdrawInfo1: "trân trọng",
  collectionAccount: "Vui lòng chọn một tài khoản thanh toán",
  withdrawAmount: "Số tiền",
  nextStep: "BƯỚC TIẾP THEO",
  userWithdrawInfo2:
    ", thông tin số dư của bạn như sau: <br/> Có thể được hoàn trả:",
  amountIsEmpty: "Số tiền Đăng xuất không thể trống",
  fundPasswordIsEmpty: "Mật khẩu tiền không thể trống",
  withdrawSuccessInfo:
    "Đơn đã được gửi, bạn có thể kiểm tra trạng thái trong [{msg}]",
  prohibitAmountNotice: "{currency_unit} <br /> tiền không dùng tiền mặt meta:",
  withdrawNotice: "Số tài khoản: {BankName} ({account}), số tiền rút: {amount}",
  confirmWithdraw: "Xác nhận tiền mặt",
  refuseReason: "Căn cứ từ chối",
  tips: "<li>Lời nhắc nhở ấm áp: </li><li> 1. Số tiền cao nhất có thể rút trong 1 lần là <i>{withdraw_min_amount}</i> {currency_unit},và tối đa là <i>{withdraw_max_amount}</i> {currency_unit}.</li> <li>2. <span class='{css}'>Mỗi ngày <i>{fee_times}</i> lần rút tiền (không tính phí), lần thứ <i>{draw_times}</i> trở đi sẽ tính <i>{rate}%</i> phí rút. Nếu như có sự bất tiện,mong quý khách vui lòng thông cảm, Xin cám ơn quý khách.</span></li><li class='{css_time}'>3. Thời gian rút tiền hàng ngày là <i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<li>Mẹo thân mật: </li> <li> 1. Số tiền rút tối đa cho một giao dịch duy nhất là <i> {amount} </i>. </li> <li>2. Bạn có thể Đăng xuất <i> {max_times} lần </i> mỗi ngày. Các khoản Đăng xuất dưới <i> {min_amount} </i> sẽ được khấu trừ từ <i> Rs {fixed_fee} </i>, trong khi các khoản Đăng xuất trên <i> {min_amount} </i> sẽ được khấu trừ từ <i> {rate}% </i>. </li>",
  tips2:
    "<li>Mẹo thân mật: </li> <li> 1. Số tiền rút tối đa cho một giao dịch duy nhất là <i> {amount} </i>. </li> <li>2. Bạn có thể Đăng xuất <i> {max_times} lần </i> mỗi ngày. Đăng xuất sẽ được khấu trừ từ <i> {tỷ lệ}% </i> phí xử lý cộng với phí dịch vụ <i> Rs {fixed_service_fee} </i>. Việc Đăng xuất của bạn sẽ đến trong vòng <i> {complete_hours} </i> giờ. </li>",
  tipTmpl:
    "<li>Intimate tips:</li><li>1. The minimum single withdrawal is <i>{withdraw_min_amount}</i>{currency_unit}, and the maximum is <i>{withdraw_max_amount}</i>{currency_unit}. </li><li>2. You can withdraw funds <i>{max_times}</i> times a day, <span class='{css}'> where you can withdraw funds for free<i>{fee_times}</i >times</span></li>",
  tipTmpl1:
    "Withdrawal less than <i>{amount}</i> will deduct the handling fee of <i>{value}</i>{value_unit};",
  tipTmpl2:
    "Withdrawals greater than or equal to <i>{min_amount}</i> and less than <i>{max_amount}</i> will be deducted from the handling fee of <i>{value}</i>{value_unit};",
  tipTmpl3:
    "Withdrawals greater than or equal to <i>{amount}</i> will deduct the handling fee of <i>{value}</i>{value_unit}.",
  tipTmpl4:
    "<i>{value}</i>{value_unit} handling fee will be deducted for all withdrawals.",
  noticeOfGettingU: "Tương đương với {amount} U",
};
