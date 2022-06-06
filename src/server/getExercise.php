<?php 
	header("content-type:text/json;charset=utf-8");
	
	$code=0;
	$MESSAGES=["获取题目失败",""];
	$type=$_REQUEST["type"];
	// $type=1;
	include("functions.php");
	include("conn.php");
	$sql="select question_style,content,option_A,option_B,option_C,option_D,answer_analysis,correct_option from tb_question where category_id = '$type'";
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