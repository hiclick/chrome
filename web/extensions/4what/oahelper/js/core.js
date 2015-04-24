/**
 * http://oa.pc.com.cn/
 * http://dev5.pconline.com.cn:8004/
 *
 * @requires jQuery
 */
(function() {

var oahelper = window["oahelper"] = window["oahelper"] || {
	dateFormat: function(date) {
		var
		date = new Date(),
		yyyy = date.getFullYear(),
		MM = date.getMonth() + 1,
		dd = date.getDate(),
		HH = date.getHours(),
		mm = date.getMinutes(),
		ss = date.getSeconds();

		// + 0
		if (mm < 10) {
			mm = "0" + mm;
		}
		if (ss < 10) {
			ss = "0" + ss;
		}

		return yyyy  + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
	},
	domain: window.location.protocol + "//" + window.location.host,
	fieldValue: function(value, text) {
		return {
			"value": value,
			"text": text || value
		};
	},
	mask: function(bln) {
		$("#background, #progressBar").toggle(bln !== false);
	},
	storage: {
		get: function(key) {
			var data = JSON.parse(window.localStorage.getItem("oahelper")) || {};
			return key ? data[key] : data;
		},
		set: function(key, value) {
			var data = this.get();
			data[key] = value;
			window.localStorage.setItem("oahelper", JSON.stringify(data));
			chrome.storage.local.set({
				"oahelper": data
			});
		},
		sync: function(callback) {
			if ($.isEmptyObject(this.get())) {
				chrome.storage.local.get(function(items) {
					var data = items["oahelper"];

					if (data) {
						window.localStorage.setItem("oahelper", JSON.stringify(data));
					}

					callback();
				});
			} else {
				callback();
			}
		}
	}
};

})();
