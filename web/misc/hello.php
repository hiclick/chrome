<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test Document</title>
    <script src="http://www1.pconline.com.cn/api/libs/jquery/jquery-1.8.3.min.js"></script>
</head>


<body>

<h3>开学季广告参数测试</h3>

<hr>

<?
echo "这是一个PHP脚本，对参数中的空格未做任何处理：<br/><br/>";

$id = $_REQUEST['unionId'];

echo "URL 中的 unionId 参数带了空格，但不影响程序接收：";

echo "<span id='unionId'>";

echo $id;

echo "</span>";

?>

<script type="text/javascript">
    $(function(){
        $("#unionId").css("color","red");
    });
</script>

</body>

</html>