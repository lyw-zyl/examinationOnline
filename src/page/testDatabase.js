var questionHtml
var allQuestions
$("#btnTestIndex").on("click", onChangeTestIndex)//到题库管理
$("#btnTestClassIndex").on("click", onChangeTestClassIndex)//到题目类别管理
$('#btnDelete').on('click', onDeleteTest)
function onChangeTestIndex () {
  console.log('aa')
  $(".testClassIndex").hide()
  $(".testIndex").show()
  $("#btnTestIndex").css('background', '#FFFFFF')
  $('#btnTestClassIndex').css('background', '#81C0E5')
}

function onChangeTestClassIndex () {
  console.log('ss')
  $(".testIndex").hide()
  $(".testClassIndex").show()
  $("#btnTestClassIndex").css('background', '#FFFFFF')
  $("#btnTestIndex").css('background', '#81C0E5')
}
function onDeleteTest () {
  console.log('删除')
}
$.ajaxSetup({ async: false })
$.get('../questions.json', function (data) {
  allQuestions = data
})
console.log(allQuestions)

var pageIndex = 1    //页面索引初始值   
var pageSize = 8     //每页显示条数初始化，修改显示条数，修改这里即可   
var pageCount = allQuestions.length   //总的记录数，随便赋个初值好了，后面会重新赋值的 
function InitPager () {
  //分页，PageCount是总条目数，这是必选参数，其它参数都是可选
  $("#testPagination").pagination(pageCount, {
    callback: pageCallback,  //PageCallback() 为翻页调用次函数。
    prev_text: "上一页",
    next_text: "下一页",
    items_per_page: pageSize,
    num_edge_entries: 2,       //两侧首尾分页条目数
    num_display_entries: 3,    //连续分页主体部分分页条目数
    current_page: pageIndex - 1,   //当前页索引
  })
}
//翻页调用   
function pageCallback (index, jq) {
  InitTable(index + 1)
}

function InitTable (pageIndex) {
  $.get('../questions.json', function (data) {
    allQuestions = data
    questionHtml = ''
    $.each(data, function (index, obj) {
      if (index < pageIndex * 8 - 1 && index > (pageIndex - 1) * 8 - 1) {
        questionHtml += "<tr><td class='tdQuestion'>" + obj.content + "</td><td><button class='btnLook'><button class='btnLook'><button class='btnLook'>查看</button></button></button></td><td>" + obj.ans + "</td><td> <button class='btnModify'>【修改】</button><button class='btnDelete' >【删除】</button></td></tr>"
      }
    })
    $(".testIndex tbody").html(questionHtml)
  })
}

InitPager()