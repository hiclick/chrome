needJS(window.$,"http://www1.pconline.com.cn/js/pc.jquery1.3.js",function(){
	$('<input name="exit" type="button" value="补量" class="user_btn2">').click(function(){
	    var post_url = 'http://timesheet.pc.com.cn/timesheet/save1TimeSheet.html';
	    var list_url = 'http://timesheet.pc.com.cn/daily/listDailyTimeSheet.html';
	    var user_url = 'http://timesheet.pc.com.cn/report/getMyReceiver.html';
	    var month = new Date().getMonth()+1;
	    var daysOfMonth = new Date(new Date().getFullYear(),month,0).getDate();
	    var dayslist = [];
	    $.post(user_url,{},function(data){
	    	var user_id = data[0][0];
	    	var user_name = data[0][1];
		    $.post(list_url,{flag:'false',fromDate:new Date().getFullYear()+'-'+(month>9?'':'0')+month+'-01',limit:daysOfMonth,toDate:new Date().getFullYear()+'-'+(month>9?'':'0')+month+'-'+daysOfMonth,userId:user_id,start:0},function(data){
		    	var timeSheets = data.timeSheets;
		    	for(var j=0;j<timeSheets.length;j++){
		    		if(!timeSheets[j]||!timeSheets[j].workTime) continue;
		    		if(timeSheets[j].dailySheetTime*1>=8) continue;
		    		dayslist.push(timeSheets[j].workTime);
		    	}
		    	function postUrl(){
			    	if(dayslist.length<1) {
			    		$.post(list_url,{flag:'false',fromDate:new Date().getFullYear()+'-'+(month>9?'':'0')+month+'-01',limit:daysOfMonth,toDate:new Date().getFullYear()+'-'+(month>9?'':'0')+month+'-'+daysOfMonth,userId:user_id,start:0},function(data){
			    			var timeSheets = data.timeSheets;
			    			var sheetStr = user_name+',您的补量结果如下：\n';
			    			var days_of_post = 0;
			    			for(var j=0;j<timeSheets.length;j++){
			    				if(!timeSheets[j]||!timeSheets[j].workTime) continue;
			    				sheetStr+=timeSheets[j].workTime+'工作'+timeSheets[j].dailySheetTime+'小时\n';
			    				days_of_post++;
			    			}
			    			sheetStr+='总共'+days_of_post+'天，如有差错，请自行调整！';
			    			alert(sheetStr);
			    		},'json');
			    		return;
			    	}
			    	var da = dayslist.pop();
			    	$.post(post_url,{timeSheet:'{"workContentId" : 0, "websiteId" : 1, "systemId" : 534, "sheetTime" : 8, "workTime" : "'+da+'", "memo" : ""}'},postUrl);
			    }
			    postUrl();
		    },'json');
	    },'json');
	}).appendTo('.user');
});
function needJS(E,C,B){B=B||function(){};if(E)return B(false);var $=window.__needJS__||(window.__needJS__=[]),D=$[C]||($[C]={loaded:false,callbacks:[]});if(D.loaded)return B(false);var _=D.callbacks;if(_.push(B)==1){var A=document.createElement("script");A.onload=A.onreadystatechange=function(){var $=A.readyState;if($&&$!="loaded"&&$!="complete")return;D.loaded=true;for(var B=0;B<_.length;B++)_[B](true)};A.src=C;document.getElementsByTagName("head")[0].appendChild(A)}}
