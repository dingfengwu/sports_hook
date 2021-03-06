export default {
  serialNumber: "رقم السحب",
  accountName: "تونام",
  username: "اسم المستخدم",
  bankAccount: "حساب الاستلام",
  withdralAmount: "المبلغ النقدي",
  fundPassword: "كلمة مرور الأموال",
  realName: "الاسم الحقيقي",
  userWithdrawInfo1: "محترمة",
  collectionAccount: "الرجاء تحديد حساب دفع تعويضات",
  withdrawAmount: "المبلغ النقدي",
  nextStep: "الخطوة التالية",
  userWithdrawInfo2: "، معلومات رصيدك هي كما يلي: رصيد<br/> نقدي:",
  amountIsEmpty: "لا يمكن أن يكون مبلغ السحب فار",
  fundPasswordIsEmpty: "لا يمكن أن تكون كلمة مرور الأموال",
  withdrawSuccessInfo: "تم تقديم الطلب، يمكنك التحقق من الحالة في [{msg}]",
  prohibitAmountNotice: "{currency_unit} المبلغ<br /> غير النقدي:",
  withdrawNotice:
    "رقم الحساب: {BankName} ({account})، مبلغ السحب النقدي: {المبلغ}",
  confirmWithdraw: "تأكيد النقد",
  refuseReason: "سبب الرفض",
  tips: "<li>ملاحظات :</li><li>1.يمكن سحب أعلى معاملة فردية <i>{amount}</i> {currency_unit}.</li><li>2.<span class='{css}'>عمليات سحب مجانية كل يوم <i>{fee_times}</i> مرات ، بدءًا من <i>{pull_times}</i> مرات يتحمل <i>تكلفة {rate}٪</i> ، في حالة حدوث أي إزعاج ، يرجى تفهم ذلك ، شكرًا لك! </span> عدد عمليات السحب التي تمت اليوم:<i>{current_times}/{max_times}</i></li><li class='{css_time}'>3.وقت السحب اليومي هو <i>{withdraw_allowed_time}</i>.</li>",
  tips1:
    "<li>ملاحظات :</li><li>1.الحد الأقصى لمبلغ السحب لمعاملة واحدة هو <i>{amount}</i>.</li><li>2.يمكنك سحب الأموال <i>{max_times}</i> مرات في اليوم. عمليات السحب التي تقل عن <i>{min_amount}</i>سيتم خصمها<i>{fixed_fee}</i> روبية ، بينما عمليات السحب التي تزيد عن <i>{min_amount}</i> سيتم خصمها <i>{rate}٪</i> رسوم المناولة.</li>",
  tips2:
    "<li>ملاحظات :</li><li>1.الحد الأقصى لمبلغ السحب لمعاملة واحدة هو <i>{amount}</i>.</li><li>2.يمكنك سحب الأموال <i>{max_times}</i> مرات في اليوم. سيخصم السحب رسوم المناولة البالغة <i>{rate}٪</i> بالإضافة إلى رسوم الخدمة التي تبلغ <i>{fixed_service_fee}</i> روبية. سيصل السحب في غضون <i>{complete_hours}</i> ساعة.</li>",
  tipTmpl:
    "<li>ملاحظات :</li><li>1.أقل مبلغ يمكن سحبه <i>{withdraw_min_amount}</i> {currency_unit}، واكثر مبلغ يمكن سحبه هو<i>{withdraw_max_amount}</i> {currency_unit }. </li><li> 2. يمكنك سحب الأموال <i>{max_times}</i> مرات في اليوم <span class='{css}'> ،والتي يمكنك سحب الأموال منها مجانًا <i>{fee_times}</i> مرات </span><span class='{css_time}'>، وقت السحب اليومي هو <i>{withdraw_allowed_time}</i></span>.</li>",
  tipTmpl1:
    "سيؤدي السحب أقل من <i>{amount}</i> إلى خصم رسوم المناولة التي تبلغ <i>{value}</i> {value_unit} ؛",
  tipTmpl2:
    "عمليات السحب التي تزيد عن أو تساوي <i>{min_amount}</i> وأقل من <i>{max_amount}</i> سيتم خصمها من رسوم المناولة التي تبلغ <i>{value}</i> {value_unit} ؛",
  tipTmpl3:
    "عمليات السحب التي تزيد عن <i>{amount}</i> أو تساويها ستخصم رسوم المناولة التي تبلغ <i>{value}</i> {value_unit}.",
  tipTmpl4: "سيتم خصم <i>{value}</i>{value_unit} عمولة عند كل عملية سحب.",
  noticeOfGettingU: "يعادل {amount} يو",
};
