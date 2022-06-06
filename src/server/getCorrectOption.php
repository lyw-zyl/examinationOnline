<?php 
	header("content-type:text/json;charset=utf-8");
	
	$arrs=[];
	$i=0;
	$code=0;
	$MESSAGES=["获取正确答案失败",""];
	$question_id=$_REQUEST["question_id"];
	// $question_id=1;
	include("functions.php");
	include("conn.php");
	$sql="select correct_option from tb_question where question_id=?";
	$stmt=mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt,"s",$question_id);
   	mysqli_stmt_execute($stmt);
   	mysqli_stmt_bind_result($stmt,$correct_option);
		   
	mysqli_stmt_store_result($stmt);
	if(mysqli_stmt_num_rows($stmt)>0) $code=1;	
   
	while(mysqli_stmt_fetch($stmt)){
        $arrs[$i]["correct_option"]=$correct_option;
		$i++;
    }
	
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    
	getApiResult($code,$MESSAGES[$code],$arrs);
	
?>