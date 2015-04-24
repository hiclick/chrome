chrome.browserAction.onClicked.addListener(function(tab) {
	alert(
		"v1.0.1" +
		"\n\n" +
		"本插件基于Google Chrome浏览器开发，为《OA办公系统》提供“保存草稿”等功能的临时解决方案。" +
		"\n" +
		"支持“销售管理”中的下列模块：广告位申请、特殊配送申请、其他申请。" +
		"\n\n" +
		"Powered by 4what @ PCGROUP"
	);
});

/*
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	sendResponse({});
});
*/

/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
});
*/
