<?php 
	header("content-type:text/json;charset=utf-8");
	
	$arrs=[];
	$i=0;
	$code=0;
	$MESSAGES=["获取题目失败",""];
	$question_id=$_REQUEST["question_id"];
	// $question_id=1;
	include("functions.php");
	include("conn.php");
	$sql="select question_style,content,option_A,option_B,option_C,option_D from tb_question where question_id=?";
	mysqli_query($conn,"set character set 'utf8'");
	mysqli_query($conn,"set names 'utf8'");
	$stmt=mysqli_prepare($conn,$sql);
	mysqli_stmt_bind_param($stmt,"s",$question_id);
   	mysqli_stmt_execute($stmt);
   	mysqli_stmt_bind_result($stmt,$question_style,$content,$option_A,$option_B,$option_C,$option_D);
		   
	mysqli_stmt_store_result($stmt);
	if(mysqli_stmt_num_rows($stmt)>0) $code=1;	
   
	while(mysqli_stmt_fetch($stmt)){
        $arrs[$i]["style"]=$question_style;
        $arrs[$i]["content"]=$content;
		$arrs[$i]["option_A"]=$option_A;
        $arrs[$i]["option_B"]=$option_B;
		$arrs[$i]["option_C"]=$option_C;
        $arrs[$i]["option_D"]=$option_D;
		$i++;
    }
	
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
    
	getApiResult($code,$MESSAGES[$code],$arrs);
	
?>