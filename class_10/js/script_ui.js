$(function(){
    init();
});

//기본 시작 함수
function init(){
    // 풀스크린 플러그인
    $("#fullpage").fullpage({
        sectionsColor:["","#eaeef2", "#b6e4fe", "#e2dcd4", "#666"],
        navigation:true,    
        navigationTooltips:["MAIN", "PROFILE", "SKILL","PORTFOLIO", "CONTACT"],
        anchors:["main", "profile", "skill", "portfolio", "contact"],
        scrollingSpeed:1500
    });

    // main
    //링크에 마우스를 올렷을때
    $("#section0 .wrap-link .unit > a").mouseover(function(){
        var _idx = $(this).parent().index() //순서(index)찾기
        var _class = "select-" + (_idx + 1); //"select-" 문자열에 위에서 찾은 순서(index)값 + 1 더하기
        $("#section0 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제) 
        $("#section0 .wrap-bg").addClass(_class); //해당 select클래스 추가

    });

    //링크에 마우스 뺐을때
    $("#section0 .wrap-link .unit > a").mouseout(function(){
        $("#section0 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제)
    });

    //패럴럭스 배경 효과
    $("#section0").parallax({
        imageSrc:"img/bg_main.png"
    });

    //profile
    // 링크에 마우스를 올렸을때
$("#section1 .wrap-link .unit > a").mouseover(function(){
    var _idx = $(this).parent().index() //순서(index)찾기
    var _class = "select-" + (_idx + 1); //"select-" 문자열에 위에서 찾은 순서(index)값 + 1 더하기
    $("#section1 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제) 
    $("#section1 .wrap-bg").addClass(_class); 
})
    //링크에 마우스 뺐을때
$("#section1 .wrap-link .unit > a").mouseout(function(){
    $("#section1 .wrap-bg").removeClass("select-1 select-2 select-3");
});

//SKILL
var _waveId; //카운팅 효과에서 쓰는 setInterval을 저장하는 변수

//링크에 마우스를 올리고 뺐을때 (두개의 이벤트를 동시에 적용)
$("#section2 .wrap-link .unit > a").mouseover(function(){
var _idx = $(this).parent().index();
var _pos = [100, 45, 70, 25]; //미리 좌표값 설정(%)
var _rev = 100 - _pos[_idx]; //값 반전(100)
$("#section2 .wrap-wave .unit").css("transform", "translateY("+_rev+"%)"); //동적으로 파도(unit) tranlateY(세로값)
clearInterval(_waveId); //setInterval의 비정상 연속 호출을 막기 위한 선행 막음조치
_waveId = setInterval(changeNum, 10) //카운팅 함수 연속 설정

}).mouseout(function(){
$("#section2 .wrap-wave .unit").css("transform", "translateY(calc(100% - 50px))");
});


//파도에 있는 숫자의 카운팅 효과
function changeNum(){
var _num = $("#section2 .wrap-wave .unit").css('transform').split(",")[5];
_num = _num.replace(")",""); //위에서 구한 좌표값에서 ")"문자를 지움
var _th = $("#section2 .wrap-wave").height(); // 화면의 높이값
var _val = 100 - Math.round(_num / _th*100); //1.파도값의 위치값 / 화면의 높이값(백분율), 2.반올림, 
$("#section2 .wrap-wave .unit .num > strong").text(_val)


}

//카운팅 효과 멈춤  
$("#section2 .wrap-wave .unit").on("transitionend", function(){
clearInterval(_waveId); //setInterval을 멈추는 메소드
})

//portfolio

$("#section3 .wrap-photo > ul").slick({
dots: false, //하단 페이저 도트(점) 제거
arrows: false, // 좌우 버튼 제거
slidesToShow:3, //한화면 보여지는 이미지 제거
SlidesToScroll:1, //좌우 이벤트를 통해서 움직이는 갯수
variableWidth:true, //이미지(오브젝트)가 고정 값일 경우 겹침현상을 해결하기 위한 옵션
centerMode:true //기본 왼쪽 모서리가 기본인 기준점을 가운데로 이동 시킴
}).on("afterChange", function(event, slick, current){ //슬라이드가 한번 발생 후 이벤트 호출(crrent : 순번 (index))
$("#section3 .wrap-txt> ul > li").removeClass("select"); //초기화
$("#section3 .wrap-txt> ul > li").eq(current).addClass("select"); //해당순번에 select
})

//커서 커스터 마이징
document.addEventListener("mousemove", function(event){
//커서 크기
var cursorW = $("#section3 .wrap-photo .cursor").width() / 2;
var cursorH = $("#section3 .wrap-photo .cursor").height() / 2;
//마우스 위치
var mouseX = event.pageX;
var mouseY = event.pageY;
$("#section3 .wrap-photo .cursor").css({"top":mouseY - cursorH, "left":mouseX})

})
}




