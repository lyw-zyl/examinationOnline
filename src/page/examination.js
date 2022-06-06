/***************
 * 考试倒计时函数
****************/
var i=1;

//分倒计时
function countDownHour(){
    var hour_time = document.getElementById("remaining_minute");
    var second_time = document.getElementById("remaining_second");
    if(hour_time.innerHTML == 0 && second_time.innerHTML == 0){
        if(i==0){
            window.location.href="../html/examinationAfter.html";
        }
        else{
            i-=1;
        }
    }else{
        hour_time.innerHTML = hour_time.innerHTML-1;
    }
}
window.setInterval("countDownHour()",60000);

//秒倒计时
function countDownSecond(){
    var hour_time = document.getElementById("remaining_minute");
    var second_time = document.getElementById("remaining_second");
    if(second_time.innerHTML=="059"){
        second_time.innerHTML="59";
    }
    if(hour_time.innerHTML == 0 && i==0){
        btn_submit.click();
    }else if(second_time.innerHTML == 0 && i>0){
        second_time.innerHTML = 59;
    }else{
        second_time.innerHTML = second_time.innerHTML-1;
    }
}
window.setInterval("countDownSecond()",1000);


/***************
 * 进度条函数
****************/
function renewProgress(){
    countOK();
    $("#progress").val(count);
    $(".progress2").text(count+"%");
}


/***************
 * 遍历本地存储，记录已完成题目数量
****************/
var count;
function countOK(){
    count=0;
    for(var i=1;i<101;i++){
        if(localStorage.getItem(i))count++;
    }
}


/***************
 * 交卷函数
****************/
var btn_submit = document.getElementById("btn_submit");
btn_submit.onclick = async function(){//坑：这样绑定事件，必须是匿名函数!!!
    await MarkingPaper();
    localStorage.setItem("score",score);
    window.location.href="../html/examinationAfter.html";
};

/***************
 * 遍历本地存储，阅卷
****************/
var score=0;
var correct_option;
async function MarkingPaper(){
    for(var i=1;i<100;i++){
        await getCorrectOption(i);
        console.log("用户选择",localStorage.getItem(i),"正确答案",correct_option);
        var res=String(localStorage.getItem(i)).split("").sort().join("");
        if(localStorage.getItem(i) && res==correct_option){
            score++;
        }
    }
    console.log("分数",score);
 }

/***************
 * 获取正确答案
****************/
async function getCorrectOption(question_id){ //通过async封装异步方法
    return new Promise((resolve, reject) => {
        $.getJSON("../src/server/getCorrectOption.php",{"question_id":question_id},function(data){
            correct_option=data[0].data[0].correct_option;
            console.log("获取正确答案",correct_option);
            resolve(correct_option);
        });
     })

 }
     
/***************
 * 侧栏下拉按钮函数
****************/
var btn_select_bar1 = document.getElementById("select_bar1");
var flag1=0;
btn_select_bar1.onclick = function(){
    if(flag1==0){
        document.getElementById("select_content1").style.display="";
        flag1=1;
    }
    else{
        document.getElementById("select_content1").style.display="none";
        flag1=0;
    }
}
var btn_select_bar2 = document.getElementById("select_bar2");
var flag2=0;
btn_select_bar2.onclick = function(){
    if(flag2==0){
        document.getElementById("select_content2").style.display="";
        flag2=1;
    }
    else{
        document.getElementById("select_content2").style.display="none";
        flag2=0;
    }
}
var btn_select_bar3 = document.getElementById("select_bar3");
var flag3=0;
btn_select_bar3.onclick = function(){
    if(flag3==0){
        document.getElementById("select_content3").style.display="";
        flag3=1;
    }
    else{
        document.getElementById("select_content3").style.display="none";
        flag3=0;
    }
}

/***************
 * 页面题目初始化
****************/
var question_id=1;
getQuestion(question_id);
localStorage.clear();


/***************
 * 题号选择
****************/
$(document).on("click",".select_single_number",function(){
    question_id=$(this).val();
    getQuestion(question_id); 
});
$(document).on("click",".select_multiple_number",function(){
    question_id=$(this).val();
    getQuestion(question_id); 
});
$(document).on("click",".select_judge_number",function(){
    question_id=$(this).val();
    getQuestion(question_id); 
});

function getQuestion(question_id){
$.getJSON("../src/server/getQuestion.php",{"question_id":question_id},function(data){

    var question_stem = document.getElementById("question_stem");
    var optionA_content = document.getElementById("optionA_content");
    var optionB_content = document.getElementById("optionB_content");
    var optionC_content = document.getElementById("optionC_content");
    var optionD_content = document.getElementById("optionD_content");
    var select_user=localStorage.getItem(question_id);

    //显示题目
    question_stem.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+data[0].data[0].content;;
    optionA_content.innerHTML = data[0].data[0].option_A;
    optionB_content.innerHTML = data[0].data[0].option_B;
    optionC_content.innerHTML = data[0].data[0].option_C;
    optionD_content.innerHTML = data[0].data[0].option_D;
    question_style=data[0].data[0].style;

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
 * 上下一题按钮的点击事件
****************/
$(document).on("click","#up_btn",function(){
    if(question_id>1){
        question_id=parseInt(question_id)-1;
        getQuestion(question_id);
        resetAllButton();
    }
});
$(document).on("click","#down_btn",function(){

    if(question_id<100){
        question_id=parseInt(question_id)+1;
        getQuestion(question_id);
        resetAllButton();
    }
});

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
    $(".select_multiple_number").each(function(){
        if($(this).val()==question_id){
            $(this).css("background","#0582CB");
        }
    });
    $(".select_judge_number").each(function(){
        if($(this).val()==question_id){
            $(this).css("background","#0582CB");
        }
    });
    renewProgress();
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
 * 重置所有按钮
 * *************/
function resetAllButton(){
    document.getElementById("select_B").style.background="#EFEFEF";
    document.getElementById("select_C").style.background="#EFEFEF";
    document.getElementById("select_A").style.background="#EFEFEF";
    document.getElementById("select_D").style.background="#EFEFEF";
}