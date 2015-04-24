/**
 * @requires jQuery
 */
oahelper.storage.sync(function() {

//	chrome.storage.local.clear();
//	chrome.storage.local.get(function(items) { console.log(items) });

//	window.localStorage.clear();
//	console.log(window.localStorage)

//	console.log(oahelper.storage.get("draft"))

	window.setInterval(function() {
		var
		storage = {
			/*
			{
				"draft": {
					"page": {
						"auto": {
							"date": "",
							"fields": {
								"key": "value",
								"name": {
									"text": "",
									"value": ""
								},
								...
							}
						},
						"history": [
							{
								"date": "",
								"fields": {
									"key": "value",
									"name": {
										"text": "",
										"value": ""
									},
									...
								},
								"name": ""
							},
							...
						]
					},
					...
				}
			}
			*/
			data: oahelper.storage.get("draft") || {},

			add: function(page, item, auto) {
				this.save(page, function(items) {
					if (auto) {

					} else {
						items.push(item);
					}

					return items;
				}, auto ? "auto" : "history");
			},
			del: function(page, index) {
				this.save(page, function(items) {
					items.splice(index, 1);

					return items;
				}, "history");
			},
			save: function(page, fn, type) {
				var
				data = this.data[page] || {},
				items = data[type] || [];

				data[type] = fn(items);
				this.data[page] = data;

				oahelper.storage.set("draft", this.data);
			}
		},

		modules = [
			// 销售管理 > 广告位申请
			{
				fields: function() {
					return {
						"websiteId": oahelper.fieldValue(form.find("select[name='websiteId']").val(), form.find("a[name='websiteId']").text()),
						"areaId": oahelper.fieldValue(form.find("select[name='areaId']").val(), form.find("a[name='areaId']").text()),
						"departmentId": oahelper.fieldValue(form.find("select[name='departmentId']").val(), form.find("a[name='departmentId']").text()),
						"signClient": form.find(":text[name='signClient']").val(),
						"directClient": form.find(":text[name='directClient']").val(),
						"followBy": form.find(":text[name='followBy']").val(),
						"followCs": form.find(":text[name='followCs']").val(),
						"brand": form.find(":text[name='brand']").val(),
						"product": form.find(":text[name='product']").val(),
						"contractNo": form.find(":text[name='contractNo']").val(),
						"totalPrices": form.find(":text[name='totalPrices']").val(),
						"referDepartment": form.find(":hidden[name='referDepartment']").val(),
						"referDepartmentNames": form.find("textarea[name='referDepartmentNames']").val(),
						"checkedPos": form.find(":hidden[name='checkedPos']").val(),
						"fzcDeptId": form.find(":hidden[name='fzcDeptId']").val(),
						"detail": form.find("textarea[name='detail']").val(),
						"remark": form.find("textarea[name='remark']").val(),
						// 附件上传
						"isEmail": form.find(":checkbox[name='isEmail']:checked").val(),
						"isBqq": form.find(":checkbox[name='isBqq']:checked").val(),
						"adItemArr": (function() {
							var items = [];

							$("#_sell_ad_form_itemTable tbody tr").each(function() {
								items.push($(this).html()/*.replace(/\s{2,}/g, "")*/);
							});

							return items;
						})()
					};
				},
				form: "#_sell_ad_form_adForm",
				isField: function(key, value) {
					var status = true;

					switch (key) {
						case "adItemArr":
							$("#_sell_ad_form_itemTable").find("tbody").append((function() { // @deprecated
								var html = "";

								for (var i = 1, l = value.length; i <= l; i++) {
									html += '<tr rel="' + (i + 1) + '" target="trid">' + value[i - 1] + '</tr>';
								}

								return html;
							})()).end().cssTableRebuild();

						    break;
						default:
							status = false;

							break;
					}

					return status;
				},
				name: function() {
					return form.find(":text[name='signClient']").val() + " - " + form.find(":text[name='brand']").val();
				},
				page: "sell-ad",
				reset: function() {
					$("#_sell_ad_form_itemTable tbody").empty();
				}
			},
			// 销售管理 > 特殊配送申请
			{
				fields: function() {
					return {
						"websiteId": oahelper.fieldValue(form.find("select[name='websiteId']").val(), form.find("a[name='websiteId']").text()),
						"areaId": oahelper.fieldValue(form.find("select[name='areaId']").val(), form.find("a[name='areaId']").text()),
						"departmentId": oahelper.fieldValue(form.find("select[name='departmentId']").val(), form.find("a[name='departmentId']").text()),
						"signClient": form.find(":text[name='signClient']").val(),
						"directClient": form.find(":text[name='directClient']").val(),
						"product": form.find(":text[name='product']").val(),
						"followBy": form.find(":text[name='followBy']").val(),
						"followCs": form.find(":text[name='followCs']").val(),
						"brand": form.find(":text[name='brand']").val(),
						"contractNo": form.find(":text[name='contractNo']").val(),
						"totalMoneys": form.find(":text[name='totalMoneys']").val(),
						"referDepartment": form.find(":hidden[name='referDepartment']").val(),
						"referDepartmentNames": form.find("textarea[name='referDepartmentNames']").val(),
						"checkedPos": form.find(":hidden[name='checkedPos']").val(),
						"fzcDeptId": form.find(":hidden[name='fzcDeptId']").val(),
						"detail": form.find("textarea[name='detail']").val(),
						"remark": form.find("textarea[name='remark']").val(),
						// 附件上传
						"isEmail": form.find(":checkbox[name='isEmail']:checked").val(),
						"isBqq": form.find(":checkbox[name='isBqq']:checked").val(),
						"itemForm": (function() {
							var items = [];

							$("#SellDeliveryForm_table tbody tr:gt(0)").each(function() {
								items.push(JSON.parse($(this).attr("data")));
							});

							return items;
						})()
					};
				},
				form: "#SellDeliveryForm_form",
				isField: function(key, value) {
					var status = true;

					switch (key) {
						case "itemForm":
							SellApply.itemForm._getForm = function() {
								return $("#SellDeliveryForm_form");
							};

							for (var i = 0, l = value.length; i < l; i++) {
								SellApply.itemForm.addItemFormStore(JSON.stringify(value[i]));
							}

						    break;
						default:
							status = false;

							break;
					}

					return status;
				},
				name: function() {
					return form.find(":text[name='signClient']").val() + " - " + form.find(":text[name='brand']").val();
				},
				page: "sell-delivery",
				reset: function() {
					$("#SellDeliveryForm_table tbody tr:gt(0)").remove();
				}
			},
			// 销售管理 > 其他申请
			{
				fields: function() {
					return {
						"websiteId": oahelper.fieldValue(form.find("select[name='websiteId']").val(), form.find("a[name='websiteId']").text()),
						"areaId": oahelper.fieldValue(form.find("select[name='areaId']").val(), form.find("a[name='areaId']").text()),
						"departmentId": oahelper.fieldValue(form.find("select[name='departmentId']").val(), form.find("a[name='departmentId']").text()),
						"signClient": form.find(":text[name='signClient']").val(),
						"directClient": form.find(":text[name='directClient']").val(),
						"followBy": form.find(":text[name='followBy']").val(),
						"followCs": form.find(":text[name='followCs']").val(),
						"contractNo": form.find(":text[name='contractNo']").val(),
						"totalMoneys": form.find(":text[name='totalMoneys']").val(),
						"product": form.find(":text[name='product']").val(),
						"brand": form.find(":text[name='brand']").val(),
						"referDepartment": form.find(":hidden[name='referDepartment']").val(),
						"referDepartmentNames": form.find("textarea[name='referDepartmentNames']").val(),
						"checkedPos": form.find(":hidden[name='checkedPos']").val(),
						"fzcDeptId": form.find(":hidden[name='fzcDeptId']").val(),
						"detail": form.find("textarea[name='detail']").val(),
						"remark": form.find("textarea[name='remark']").val(),
						// 文件上传
						"isEmail": form.find(":checkbox[name='isEmail']:checked").val(),
						"isBqq": form.find(":checkbox[name='isBqq']:checked").val(),
						"otherItemArr": (function() {
							var items = [];

							$("#_sell_other_form_itemTable tbody tr").each(function() {
								items.push($(this).html());
							});

							return items;
						})()
					};
				},
				form: "#_sell_other_form_otherForm",
				isField: function(key, value) {
					var status = true;

					switch (key) {
						case "otherItemArr":
							$("#_sell_other_form_itemTable").find("tbody").append((function() { // @deprecated
								var html = "";

								for (var i = 1, l = value.length; i <= l; i++) {
									html += '<tr rel="' + (i + 1) + '" target="trid">' + value[i - 1] + '</tr>';
								}

								return html;
							})()).end().cssTableRebuild();

						    break;
						default:
							status = false;

							break;
					}

					return status;
				},
				name: function() {
					return form.find(":text[name='signClient']").val() + " - " + form.find(":text[name='brand']").val();
				},
				page: "sell-other",
				reset: function() {
					$("#_sell_other_form_itemTable tbody").empty();
				}
			}
		],

		form,
		target;

		for (var i = modules.length - 1; i >= 0 ; i--) {
			target = modules[i];

			form = $(target.form);

			if (form.is(":visible")) {
				var
				btn = function(name, value) {
					return $('<li><div class="button"><div class="buttonContent"><button type="button" name="' + name + '" style="color: #ff8282;">' + value + '</button></div></div></li>');
				},

				page = target.page,

				record = function(name) {
					var o = {
						date: new Date().getTime(),
						fields: target.fields()
					};

					if (name) {
						o.name = name;
					}

					return o;
				},

				toolbar = form.find("div.formBar ul");

				if (toolbar.find("button[name^='oahelper-draft']").length === 0) {
					toolbar.append(
						btn("oahelper-draft-save", "保存草稿").click(function() {
							oahelper.mask();

							var name = prompt("请输入名称：", target.name() + " @ " + oahelper.dateFormat(new Date()));

							if (name) {
								storage.add(page, record(name), false);
							}

							oahelper.mask(false);
						})
					).append(
						btn("oahelper-draft-load", "还原草稿").click(function(e) {
							e.stopPropagation();

							oahelper.mask();

							var
							data = storage.data[page],
							history = data ? data.history : [],
							list = $('<div style="background: #fff; border-color: #e7dac8; border-radius: 5px; border-style: solid; border-width: 1px 1px 1px 10px; bottom: 10px; box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.5); max-height: 320px; line-height: 1.5em; overflow: auto; padding: 5px; position: absolute; right: 10px; text-align: left; width: 320px; z-index: 1001;"></div>');

							$("body").append((function() {
								var html = "";

								for (var item, j = 0, l = history.length; j < l; j++) {
									item = history[j];

	                                html += '<li style="' + (j === l - 1 ? '' : 'border-bottom: 1px dashed silver;') + 'overflow: auto;"><a href="#" style="float: left; line-height: 2em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 20em;" title="' + oahelper.dateFormat(new Date(item.date)) + '">' + item.name + '</a><span style="color: red; cursor: pointer; display: none; float: right; font-variant: small-caps; line-height: 2em;">[Del]</span></li>';
								}

								html = '<h6 style="line-height: 2.5em; text-align: center;">' + (history.length > 0 ? '草稿列表' : '暂无数据') + '</h6><ol style="">' + html + '</ol>';

								return list.append(html).find("li").each(function(index) {
									// load
									$(this).find("a").click(function() {
										oahelper.mask();

										// reset
										form.find(":checkbox").attr("checked", false);

										target.reset();

										var
										fields = history[index].fields,

										dom,
										field,
										value;

										for (var key in fields) {
											dom = form.find(":checkbox, :hidden, :text, select, textarea").filter("[name='" + key + "']");
											field = value = fields[key];

											if (!target.isField(key, value)) {
												if (dom.is(":checkbox")) {
													dom.filter("[value='" + value + "']").attr("checked", true);
												} else if (dom.is("select")) {
													value = field.value;

													form.find("a[name='" + key + "']").text(field.text);

													// what the f...?
													if (dom.find("option[value='" + field.value + "']").length === 0) {
														dom.append('<option value="' + field.value + '">' + field.text + '</option>');
													}
												}

												dom.val(value);
											}
										}

										oahelper.mask(false);
									});

									// delete
									var del = $(this).find("span").click(function() {
										storage.del(page, index);
									});

									$(this).mouseenter(function() {
										del.show();
									}).mouseleave(function() {
										del.hide();
									})
								}).end().fadeIn();
							})()).one("click", function() {
								list.fadeOut().remove();
							});

							oahelper.mask(false);
						})
					);
				}

				break;
			}
		}
	}, 1000);

});
