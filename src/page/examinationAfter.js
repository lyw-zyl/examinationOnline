var score=document.getElementById("score");
var isAccept=document.getElementById("isAccept");
score.innerText=localStorage.getItem("score");
if(score.innerText>=90){
    isAccept.innerHTML="通过";
}
else{
    isAccept.innerHTML="不通过";
}
