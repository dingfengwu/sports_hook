export default {
  serialNumber: "Referensi No.",
  accountName: "Nama Akun",
  username: "Nama pengguna",
  bankAccount: "Nama Rekening Bank",
  withdralAmount: "Jumlah",
  fundPassword: "Sandi Pembayaran",
  realName: "",
  userWithdrawInfo1: "Sayang",
  collectionAccount: "Akun pembayaran",
  withdrawAmount: "Jumlah Penarikan",
  nextStep: "Langkah selanjutnya",
  userWithdrawInfo2:
    "Informasi saldo Anda adalah sebagai berikut: <br/> Saldo yang tersedia",
  amountIsEmpty: "Jumlah penarikan tidak boleh kosong",
  fundPasswordIsEmpty: "Kata sandi dana tidak boleh kosong",
  withdrawSuccessInfo:
    "Aplikasi penarikan telah dikirim, Anda dapat memeriksa statusnya di {{msg}}",
  prohibitAmountNotice:
    "{currency_unit} <br /> Tidak dapat penarikan dana jumlah uang tunai",
  withdrawNotice:
    "Nomor rekening penarikan: {bankName} ({account}), jumlah penarikan: {jumlah}",
  confirmWithdraw: "Konfirmasi penarikan",
  refuseReason: "Alasan penolakan",
  tips: "<li>Pengingat intim:</li><li>1.Jumlah penarikan maksimum untuk satu transaksi adalah <i> {amount} </i> {currency_unit}.</li><li>2.<span class='{css}'>Penarikan gratis <i> {fee_times} </i> kali setiap hari, mulai dari waktu <i> {withdraw_times} </i>, Anda akan dikenakan biaya <i> {rate}% </i> Jika terjadi ketidaknyamanan, harap dipahami, terima kasih! </span>Jumlah penarikan yang dilakukan hari ini: <i>{current_times}/{max_times}</i></li><li class='{css_time}'>3.Waktu penarikan harian adalah <i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<li>Pengingat intim:</li><li>1.Jumlah penarikan maksimum untuk satu transaksi adalah <i>{amount}</i>.</li><li>2.Anda dapat penarikan dana <i> {max_times} </i> kali sehari. Penarikan di bawah <i> {min_amount} </i> akan memotong biaya penanganan sebesar <i> {fixed_fee} </i> rupee, dan penarikan di atas <i> {min_amount} </i> akan memotong biaya penanganan <i> {rate}% </i>.</li>",
  tips2:
    "<li>Pengingat intim：</li><li>1.Jumlah penarikan maksimum untuk satu transaksi adalah <i>{amount}</i>。</li><li>2.Anda dapat penarikan dana <i> {max_times} </i> kali sehari.Penarikan akan mengurangi biaya penanganan <i>{rate}%</i> dan biaya layanan sebesar <i>{fixed_service_fee}</i> rupee.Penarikan Anda akan tiba dalam <i>{complete_hours}</i> jam.</li>",
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
  noticeOfGettingU: "Setara dengan {amount} U",
};
