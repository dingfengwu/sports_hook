export default {
  serialNumber: "出金番号",
  accountName: "アカウント名",
  username: "ユーザー名",
  bankAccount: "領収書アカウント",
  withdralAmount: "現金金額",
  fundPassword: "資金パスワード",
  realName: "リアルネーム",
  userWithdrawInfo1: "尊敬する",
  collectionAccount: "ペイアウトアカウントを選択してください",
  withdrawAmount: "現金金額",
  nextStep: "次のステップ",
  userWithdrawInfo2: ",あなたの残高情報は:<br/>利用可能振込残高:",
  amountIsEmpty: "出金額を空欄にすることはできません",
  fundPasswordIsEmpty: "資金パスワードは空欄にできません",
  withdrawSuccessInfo:
    "申請は送信されました。[{msg}] でステータスを確認できます。",
  prohibitAmountNotice: "{currency_unit}<br/> 現金以外の金額:",
  withdrawNotice: "口座番号：{bankName}（{count}）、現金引き出し金額：{金額}",
  confirmWithdraw: "現金の確認",
  refuseReason: "拒否の理由",
  tips: "<h1>ヒント:</h1><li>1.<i>単一の最大金額 {金額}</i> {currency_unit}。</li><li>2.<span class='{css}'><i>{fee_times}</i> 1日あたりの無料出金、<i>{<i>rate}% は {dwrith_times} から請求されます</i></i>。ご迷惑をおかけして、ありがとう！</span>本日引き出しが行われました:<i>{current_times}/{max_times</i></li> <li class='{css_time}'><i>}</i> 3.</li>",
  tips1:
    "<h1>ヒント:</h1><li>1.1 つのトランザクションの最大出金額は <i>{ount}</i> です。</li><li>2.<i>{max_times} は1日2回出金できます</i>。<i>{min_alount}</i> を下回る引き出しは <i>{fixed_fee} ルピーの手数料から差し引かれ</i>、<i>{min_alount}</i> を超える引き出しは <i>{rate} ％の手数料から差し引かれます</i>。</li>",
  tips2:
    "<h1>ヒント:</h1><li>1.1 つのトランザクションの最大出金額は <i>{ount}</i> です。</li><li>2.<i>{max_times} は1日2回出金できます</i>。引き出金は {<i>rate}% と {fixed_service_fee}</i> <i>ルピーのサービス料から差し引かれます</i>。出金は <i>{complete_hours} 時間以内に行われます</i>。</li>",
  tipTmpl:
    "<h1>ヒント:</h1><li>1回の出金で最低<i>{withdraw_min_amount}</i>{currency_unit}、最高<i>{withdraw_max_amount}</i>{currency_unit}です.</li><li>1日<i>{max_times}</i>回の出金が可能で、今日は<i>{current_times}</i>回出金しました。</li>",
  tipTmpl1:
    "未満<i>{amount}</i>{currency_unit}出金のうちの引き落とし額が差し引かれます<i>{value}</i>{value_unit}取扱手数料",
  tipTmpl2:
    "より大きいか等しい <i>{min_amount}</i>{currency_unit}、および次より小さい<i>{max_amount}</i>{currency_unit}出金のうちの引き落とし額が差し引かれます<i>{value}</i>{value_unit}取扱手数料",
  tipTmpl3:
    "より大きいか等しい<i>{amount}</i>出金のうちの引き落とし額が差し引かれます<i>{value}</i>{value_unit}手数料です。",
  tipTmpl4:
    "{channel_type}<i>{value}</i>{value_unit}の手数料が差し引かれます。",
  noticeOfGettingU:
    "{source_currency_unit},に相当{amount}{target_currency_unit}おう",
  tipType1: "カードの引出しには",
  tipType2: "すべてのUSDT出金には",
};
