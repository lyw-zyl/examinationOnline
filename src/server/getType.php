<?php 
	header("content-type:text/json;charset=utf-8");
	
	$code=0;
	$MESSAGES=["获取题目失败",""];
	$type=$_REQUEST["type"];
	// $type=1;
	include("functions.php");
	include("conn.php");
	$sql="select * from tb_category where category_id = '$type'";
	mysqli_query($conn,"set character set 'utf8'");
	mysqli_query($conn,"set names 'utf8'");
	$result = $conn->query($sql);
	
	$question = array();
	while($row = mysqli_fetch_array($result)){
	    array_push($question, $row);
	}
	
    
    mysqli_close($conn);
    
	getApiResult($code,$MESSAGES[$code],$question);
	
?>