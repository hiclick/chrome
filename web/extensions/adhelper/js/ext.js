function _hide(title) {
    var
        tbl = $("table.stripe_tb:eq(0)"),
        th = tbl.find("th:contains(" + title + ")"),
        index = th.index();

    th.hide();

    tbl.find("tbody tr").each(function() {
        $(this).find("td").eq(index).hide();
    });
}

$(document).ready(function(){
    $("#helper").click(function(){
        alert("我被点了");
    });
});

