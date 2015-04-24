/**
 * @requires jQuery
 *
 * http://whois.pconline.com.cn/batch.jsp
 * http://count6.pconline.com.cn/cbuffer.jsp
 */
chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, {
		method: "get"
	}, function(response) {
//		alert(response.data)

		var
		html = response.data,
		ips = $.unique(html.match(
//			/(?:\d{1,3}\.){3}\d{1,3}/g
			/(0*((2(5[0-5]|[0-4]\d))|1?\d?\d)\.){3}0*((2(5[0-5]|[0-4]\d))|1?\d?\d)(?=\D|$)/g
		));

//	    alert(html)
//		alert(ips)
//		alert(ips.length)

//		ips = ips.slice(0, 128);

		$.ajax({
			type: "POST",
			url: "http://whois.pconline.com.cn/batch.jsp",
			data: {
				ips: ips.join(" ")
			},
			dataType: "html",
			success: function(data) {
//				alert(data);

				var
				re,
				result = $(data).find("textarea[name='ips']").val();
//				alert(result);

				for (var item, i = 0, l = ips.length; i < l; i++) {
					item = ips[i];
					re = new RegExp(item + "=(.+)").exec(result);
//					alert(re);

					html = html.replace(new RegExp(item + "([^.（])", "g"), item + "（" + $.trim(re[1]) + "）$1");
				}

				chrome.tabs.sendMessage(tab.id, {
					method: "set",
					data: html
				}, function(response) {});
			}
		});
	});
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
