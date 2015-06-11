function keyup(e) {
	if ((e.keyCode || e.which) === 83 && e.shiftKey) {
		show();
	}
}

function load() {
/* 
	window.setTimeout(function() {
		window.location.reload();
	}, 1000 * 30);	
*/

	if (window.location.search.indexOf("q=s") > -1) {
		show();
	}
}

function show() {
	document.getElementById("overlay").style.display = "none";
}
