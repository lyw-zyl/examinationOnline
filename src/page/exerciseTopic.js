$(document).ready(function () {

    if(localStorage.getItem("amount")){
        var style='';
        $.getJSON("../src/server/getType.php",{"type":localStorage.getItem("type")},function(data){
            style = data[0].data[0].category_name;
            console.log(style);
            $(".progress2").text(localStorage.getItem("ok_amount") + "/" + localStorage.getItem("amount"));
            $("#progress").val(localStorage.getItem("ok_amount"));
            $(".old_l2").text(style);
        });
    }
    else{
        $(".progress2").text(0 + "/" + 0);
        $("#progress").val(0);
    }
});

function goOnClick(){
    if(localStorage.getItem("amount")){
        window.location.href='../html/exercise.html';
    }
    else{
        alert("没有往期练习");
    }
}
function btnNewClick(){
    localStorage.clear();
    var type = document.getElementsByName("type")[0];
    localStorage.setItem("type",type.value);
    var amount = document.getElementsByName("amount")[0];
    localStorage.setItem("amount",amount.value);
    window.location.href='../html/exercise.html';
};