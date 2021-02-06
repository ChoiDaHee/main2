$(function(){
    //init(); //초기 실행 파일이지만 프리로딩이 완료된 시점에서 호출이 필요해
    var load_img = 0;
    var total_img = $("#fullpage img").length;
    
    $("#fullpage").imagesLoaded().done(function(){ //프리로딩 완료 이벤트
        $(".wrap-loading").addClass("on"); //완료 트렌지션 애니메이션
        setTimeout(function(){
            $(".wrap-loading").remove(); //0.7초 후 프리로딩 마크업을 hrml상에서 삭제처리
        },700)
        init(); //프리로딩 완료시점 초기 함수 실행
    }).progress(function(index, image){//프리로딩 이미지가 하나씩 로드 완료시 호출되는 중간과정 이벤트
        var _percent = Math.floor(index.progressedCount / total_img *100) //순서대로 이미지 호출 갯수 / 이미지 총수(백분률)
        $(".wrap-loading .num").text(_percent).css("width", _percent + "%"); //프리로딩 퍼센트 숫자 표시 마크업에 퍼센트 실시간 업데이트
    });
});



//기본 시작 함수
function init(){
    // 풀스크린 플러그인
    $("#fullpage").fullpage({
        sectionsColor:['','#eaeef2',"#b6e4fe","#e2dcd4","#fff"],
        navigation:true,
        navigationTooltips:["MAIN","PROFILE","SKILL","PORTFOLIO","CONTACT"],
        anchors:["main","profile","skill","portfolio","contact"],
        scrollingSpeed:1500,
        onLeave:function(name, index, direction){
            if(index == 1){//index가 1일 경우
                // console.log("aaa")
                $("#section0 .ico").css("transform","translateY(0)")
            }else{//indexrk 1이 아닐 경우
                $("#section0 .ico").css("transform","translateY(-300px)")
            };
        },
        afterLoad:function(name, index, direction){
            $(".section").eq(index-1).addClass("on");
        }
    });

    // main
    // 링크에 마우스를 올렸을때
    $("#section0 .wrap-link .unit > a").mouseover(function(){
        var _idx = $(this).parent().index() //순서(index) 찾기
        var _class = "select-" + (_idx + 1); //"select-" 문자열에 위에서 찾은 순서(index)값 + 1 더하기
        $("#section0 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제)
        $("#section0 .wrap-bg").addClass(_class); //해당 select클래스 추가
    });
    // 링크에 마우스를 뺐을때
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
        var _idx = $(this).parent().index() //순서(index) 찾기
        var _class = "select-" + (_idx + 1); //"select-" 문자열에 위에서 찾은 순서(index)값 + 1 더하기
        $("#section1 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제)
        $("#section1 .wrap-bg").addClass(_class); //해당 select클래스 추가
    })
    // 링크에 마우스를 뺐을때
    $("#section1 .wrap-link .unit > a").mouseout(function(){
        $("#section1 .wrap-bg").removeClass("select-1 select-2 select-3"); //초기화(모든 select클래스 삭제)
    });

    //skill
    var _waveId; //카운팅 효과에서 쓰는 setInterval을 저장하는 변수

    // 링크에 마우스를 올리고 뺐을때(두개의 이벤트를 동시에 적용)
    $("#section2 .wrap-link .unit > a").mouseover(function(){
        var _idx = $(this).parent().index(); //선택한 index
        var _pos = [100, 45, 70, 25]; //미리 좌표값 설정(%)
        var _rev = 100 - _pos[_idx]; //값 반전(100)
        $("#section2 .wrap-wave .unit").css("transform","translateY("+_rev+"%)"); //동적으로 파도(unit) translateY(세로값)이동
        clearInterval(_waveId); //setInterval의 비정상 연속 호출을 막기위한 선행 막음조치
        _waveId = setInterval(changeNum,10); //카운팅 함수 연속 호출
    }).mouseout(function(){
        $("#section2 .wrap-wave .unit").css("transform","translateY(calc(100% - 50px))");
    });

    //파도에 있는 숫자의 카운팅 효과
    function changeNum(){
        //console.log("aaa")
        //파도(unit)의 transform matrix좌표값 중에서 5번째 translateY의 값 구함
        var _num = $("#section2 .wrap-wave .unit").css('transform').split(",")[5];
        _num =  _num.replace(")","");//위에서 구한 좌표값에서 ")"문자를 지움(파도(unit)의 현재 위치값(px단위))
        var _th = $("#section2 .wrap-wave").height(); //화면의 높이값
        var _val = 100 - Math.round(_num / _th*100); //1.파도의 위치값 / 화면의 높이값(백분율), 2.반올림, 3.100기준 반전
        $("#section2 .wrap-wave .unit .num > strong").text(_val); //html의 숫자태그에 구한 값을 업데이트
    }

    //카운팅 효과 멈춤
    $("#section2 .wrap-wave .unit").on("transitionend", function(){
        clearInterval(_waveId); //setInterval을 멈추는 메소드
    })

    //portfolio
    //슬릭 슬라이드 플러그인
    $("#section3 .wrap-photo > ul").slick({
        dots:false, //하단 페이저 도트(점) 제거
        arrows:false, //좌우 버튼 제거
        slidesToShow:3, //한화면 보여지는 이미지 갯수
        SlidesToScroll:1, //좌우 이벤트를 통해서 움직이는 갯수
        variableWidth:true, //이미지(오브젝트가) 고정 값일 경우 겸침현상을 해결하기 위한 옵션
        centerMode:true //기본 왼쪽 모서리가 기본인 기준점을 가운데로 이동 시킴
    }).on("afterChange",function(event, slick, current){ //슬라이드가 한번 발생 후 이벤트 호출 (current : 순번(index))
        $("#section3 .wrap-txt > ul > li").removeClass("select");//초기화
        $("#section3 .wrap-txt > ul > li").eq(current).addClass("select"); //해당순번에 select(등장클래스) 적용
    })

    //커서 커스터 마이징
    document.addEventListener("mousemove",function(event){

        //커서 크기
        var cursorW = $("#section3 .wrap-photo .cursor").width() / 2;
        var cursorH = $("#section3 .wrap-photo .cursor").height() / 2;
        //마우스 위치
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        $("#section3 .wrap-photo .cursor").css({"top":mouseY - cursorH, "left":mouseX - cursorW})
        //console.log(mouseX, mouseY);
    })

    //rgb(0,0,0) 검정
    //rgb(255,255,255)흰색
    // contact
    $("#section4 .wrap-input > form .group > input").on("textInput",function(event){ //input에 키프레스이벤트
        var _typo = event.originalEvent.data; //키프레스시 타이핑한 값
        //rgb(색상정보) 랜덤으로 추출
        var _r = Math.floor(Math.random()*256);
        var _g = Math.floor(Math.random()*256);
        var _b = Math.floor(Math.random()*256);
        var _rgb = "rgb("+_r+","+_g+","+_b+")";//3개의 색상정보를 하나의 css포멧으로 합함.

        var _rn = Math.floor(Math.random()*3);//svg애니메이션을 담은 클래스를 랜덤으로 적용하기 위한 랜덤값(0~3)

        $("<span class='ani-"+_rn+"' style='color:"+_rgb+"' >"+_typo+"</span>")
        .appendTo($("#section4 .wrap-typo .wrap-typo-inner"))//화면에 동적으로 타이포span을 넣어줌
        .on("animationend",function(){ //애니메이션이 끝나는 시점에 발생하는 이벤트
            $(this).remove(); //동적으로 생성된 타이포 span을 html상에서 완전 삭제
        })

        //대상.append(추가되는마크업);
        //추가되는마크업.appendTo(대상).추가이벤트
    })
    
}