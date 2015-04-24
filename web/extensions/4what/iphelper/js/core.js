/**
 * @requires jQuery
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch (message.method) {
		case "get":
			sendResponse({
				data: $("body").html()
			});

			break;
		case "set":
			$("body").html(message.data);

			break;
		default:
			break;
	}
});
