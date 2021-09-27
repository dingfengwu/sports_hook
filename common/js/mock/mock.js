const Mock = require('mockjs');
//const Random = Mock.Random;
const matchList = require("./match-list");

Mock.mock(
	'/api?action=GetMatchList&match_id=&status=0&date[]=2021-09-24&date[]=2021-09-25&page=1&pagesize=10&terminal_id=1&lang=zh-CN',
	"get", matchList);
