var question_id=0 ;
var count=0;
// localStorage.clear();
var type=localStorage.getItem("type");
$(document).ready(function () {
    document.getElementById("progress").max=localStorage.getItem("amount");
    $(".progress2").text(count+"/" + localStorage.getItem("amount"));
    getQuestion(type,question_id);
    renewProgress();
});

function getQuestion(type,question_id){
    $.getJSON("../src/server/getExercise.php",{"type":type},function(data){
    
        var question_stem = document.getElementById("question_stem");
        var optionA_content = document.getElementById("optionA_content");
        var optionB_content = document.getElementById("optionB_content");
        var optionC_content = document.getElementById("optionC_content");
        var optionD_content = document.getElementById("optionD_content");
        var select_user=localStorage.getItem(question_id);
    
        //显示题目
        question_stem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+data[0].data[question_id].content;
        optionA_content.innerHTML = data[0].data[question_id].option_A;
        optionB_content.innerHTML = data[0].data[question_id].option_B;
        optionC_content.innerHTML = data[0].data[question_id].option_C;
        optionD_content.innerHTML = data[0].data[question_id].option_D;
        question_style=data[0].data[question_id].question_style;
    
        //非判断题显示C、D选项
        if(question_style!=3){
            document.getElementById("select_C").style.display="";
            document.getElementById("select_D").style.display="";
        }
        else{
            document.getElementById("select_C").style.display="none";
            document.getElementById("select_D").style.display="none";
        }
    
        //如果题目已经做过就显示已选择的选项，否则清除所有按钮的选中效果
        if(select_user){
            if(select_user=="A")btn_A_OK();
            else if(select_user=="B")btn_B_OK();
            else if(select_user=="C")btn_C_OK();
            else if(select_user=="D")btn_D_OK();
        }
        else{
            resetAllButton();
        }
    });
}

/***************
 * 上下一题按钮的点击事件
****************/
$(document).on("click","#up_btn",function(){
    if(question_id>0){
        question_id=parseInt(question_id)-1;
        getQuestion(type,question_id);
        resetAllButton();
        resetCorrect();
    }
    else{
        alert("已经是第一题了");
    }
});
$(document).on("click","#down_btn",function(){

    if(question_id<localStorage.getItem("amount")){
        question_id=parseInt(question_id)+1;
        getQuestion(type,question_id);
        resetAllButton();
        resetCorrect();
    }
    else{
        alert("已经是最后一题了");
    }
});

/***************
 * 重置答案和解析
****************/
function resetCorrect(){
    var correct_option = document.getElementById("correct_option");
    var answer_analysis = document.getElementById("answer_analysis"); 

    correct_option.innerHTML = '';
    answer_analysis.innerHTML = '';
}
/***************
 * 选择答案
****************/
var question_style;
$(document).on("click","#select_A",function(){
    var user_select=$(this).text();
    saveSelect(question_id,user_select);
    btn_A_OK();
});
$(document).on("click","#select_B",function(){
    var user_select=$(this).text();
    saveSelect(question_id,user_select);
    btn_B_OK();
});
$(document).on("click","#select_C",function(){
    var user_select=$(this).text();
    saveSelect(question_id,user_select);
    btn_C_OK();
});
$(document).on("click","#select_D",function(){
    var user_select=$(this).text();
    saveSelect(question_id,user_select);
    btn_D_OK();
});

/***************
 * 进度条函数
****************/
function renewProgress(){
    countOK();
    $("#progress").val(count);
    $(".progress2").text(count+"/" + localStorage.getItem("amount"));
}

/***************
 * 遍历本地存储，记录已完成题目数量
****************/
function countOK(){
    count=0;
    for(var i=0;i<localStorage.getItem("amount");i++){
        if(localStorage.getItem(i))count++;
    }
    console.log(count);
}

/***************
 * 作答结果暂存本地，更新题号按钮颜色，更新进度条
****************/
/**
 * 原来A 新的undefined true
 */

 function saveSelect(question_id,user_select){
    var usedSelect;
    var newSelect;
    if(question_style==1||question_style==3){//非多选题
        localStorage.setItem(question_id,user_select);
    }
    else{//多选题
        if(localStorage.getItem(question_id)&&localStorage.getItem(question_id)!='undefined'){//已有选择的选项
            usedSelect=String(localStorage.getItem(question_id));

            if(String(usedSelect).indexOf(user_select)>=0){//取消选择
                newSelect=String(usedSelect).replace(user_select,"");
                console.log('取消');
            }
            else {
                newSelect=String(usedSelect)+String(user_select);
                console.log('增加',newSelect);
            }        

            console.log(newSelect);
            localStorage.setItem(question_id,newSelect);
        }
        else{
            localStorage.setItem(question_id,user_select);
        }
    }
    $(".select_single_number").each(function(){
        if($(this).val()==question_id){
            $(this).css("background","#0582CB");
        }
    });
}

/***************
 * 选中按钮A 
 * *************/
 function btn_A_OK(){
    if(question_style==1||question_style==3){//非多选题
        document.getElementById("select_A").style.background="#0582CB";
        document.getElementById("select_B").style.background="#EFEFEF";
        document.getElementById("select_C").style.background="#EFEFEF";
        document.getElementById("select_D").style.background="#EFEFEF";
    }
    else{//多选题
        if(document.getElementById("select_A").style.background=="rgb(5, 130, 203)"){
            document.getElementById("select_A").style.background="#EFEFEF";
        }
        else{
            document.getElementById("select_A").style.background="#0582CB";
        }
            
    }
}

/***************
 * 选中按钮B 
 * *************/
function btn_B_OK(){
    if(question_style==1||question_style==3){//非多选题
        document.getElementById("select_A").style.background="#EFEFEF";
        document.getElementById("select_B").style.background="#0582CB";
        document.getElementById("select_C").style.background="#EFEFEF";
        document.getElementById("select_D").style.background="#EFEFEF";
    }
    else{//多选题
        if(document.getElementById("select_B").style.background=="rgb(5, 130, 203)")
            document.getElementById("select_B").style.background="#EFEFEF";
        else
            document.getElementById("select_B").style.background="#0582CB";
    }
}

/***************
 * 选中按钮C 
 * *************/
function btn_C_OK(){
    if(question_style==1||question_style==3){//非多选题
        document.getElementById("select_A").style.background="#EFEFEF";
        document.getElementById("select_B").style.background="#EFEFEF";
        document.getElementById("select_C").style.background="#0582CB";
        document.getElementById("select_D").style.background="#EFEFEF";
    }
    else{//多选题
        if(document.getElementById("select_C").style.background=="rgb(5, 130, 203)")
            document.getElementById("select_C").style.background="#EFEFEF";
        else
            document.getElementById("select_C").style.background="#0582CB";
    }
}

/***************
 * 选中按钮D 
 * *************/
function btn_D_OK(){
    if(question_style==1||question_style==3){//非多选题
        document.getElementById("select_A").style.background="#EFEFEF";
        document.getElementById("select_B").style.background="#EFEFEF";
        document.getElementById("select_C").style.background="#EFEFEF";
        document.getElementById("select_D").style.background="#0582CB";
    }
    else{//多选题
        if(document.getElementById("select_D").style.background=="rgb(5, 130, 203)")
            document.getElementById("select_D").style.background="#EFEFEF";
        else
            document.getElementById("select_D").style.background="#0582CB";
    }
}

/***************
 * 提交按钮，显示正确答案和解析
 * *************/
 $(document).on("click","#submit_btn",function(){
    $.getJSON("../src/server/getExercise.php",{"type":type},function(data){
        
        var correct_option = document.getElementById("correct_option");
        var answer_analysis = document.getElementById("answer_analysis");
        
        //显示答案和解析
        correct_option.innerHTML = data[0].data[question_id].correct_option;
        answer_analysis.innerHTML = data[0].data[question_id].answer_analysis;
    });
    renewProgress();
});
/***************
 * 重置所有按钮
 * *************/
function resetAllButton(){
    document.getElementById("select_B").style.background="#EFEFEF";
    document.getElementById("select_C").style.background="#EFEFEF";
    document.getElementById("select_A").style.background="#EFEFEF";
    document.getElementById("select_D").style.background="#EFEFEF";
}
 
function exitClick(){
    localStorage.setItem("ok_amount",count);
    window.location.href = '../html/exerciseTopic.html';
}