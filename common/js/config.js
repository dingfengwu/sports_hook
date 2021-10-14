import i18n from "../../lang/index.js"

const bottomMenu = [{
		icon: "icon-home",
		text: i18n.t("home.title"),
		url: "/pages/home/index"
	},
	{
		icon: "icon-qianbao",
		text: i18n.t("wallet.title"),
		url: "/pages/fund/wallet"
	},
	{
		icon: "icon-zuqiu-copy",
		text: i18n.t("game.title"),
		url: "/pages/game/index"
	},
	{
		icon: "icon-dingdan",
		text: i18n.t("gameRecord.title"),
		url: "/pages/game/game-record"
	},
	{
		icon: "icon-wode",
		text: i18n.t("my.title"),
		url: "/pages/my/index"
	},
];
const innerConfig = {
	baseUrl: "/api",
	terminalId: "1",
	client: "h5",
	defaultPagesize: 10,
	bottomMenu: bottomMenu,
	isAgent: 1, //创建开户链接时，用户类型为代理；1为代理，0为用户
	days: 0, //创建开户链接时，链接有效天数，0为永久
	showSaleVolume: 0, //是否显示销量
	showTeamImage:false,//是否显示团队图片
};
export const config = {
	...window.config || {},
	...innerConfig
};
window.config = config;
