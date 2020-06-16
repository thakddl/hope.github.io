$(document).ready(function(){
    // 메뉴 call
    sw = true
    $(".menu_btn").click(function(){
        if (sw==true) {
            $(".menu").fadeIn(400);
            $(".menu").css({"display":"flex"});
            $("#bar1").css({"transform":"rotateZ(45deg)"});
            $("#bar3").css({"transform":"rotateZ(-45deg)"});
            $("#bar2").css("width","0px");
            $("#sim").css("display","none");
        } else {
            $(".menu").fadeOut(100);
            $("#bar1").css({"transform":"rotateZ(0deg)"});
            $("#bar3").css({"transform":"rotateZ(0deg)"});
            $("#bar2").css("width","100%");
            $("#sim").css("display","block");
        } sw = !sw
    });
});