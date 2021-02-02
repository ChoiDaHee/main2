$(function(){
    //메뉴 열기
    $(".header .btn-gnb-ham").click(function(){
        $(".header .gnb").addClass("on");
    });

    //메뉴 닫기
    $(".header .btn-gnb-ham").click(function(){
        $(".header .gnb").removeClass("on");
    });
});
