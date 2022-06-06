function countDown(){
    //获取初始时间
    var time = document.getElementById("read_time");
    
    //获取到id为time标签中的数字时间
    if(time.innerHTML == 0){
        //等于0时清除计时，点击跳转指定页面

        var btn = document.getElementById("confirm");
        btn.innerHTML="我已知悉，开始考试";
        btn.style.background="#0582CB"
        btn.onclick = function(){
            window.location.href="../html/examination.html";
        }
    }else{
        time.innerHTML = time.innerHTML-1;
    }
}
//1000毫秒调用一次
window.setInterval("countDown()",1000);