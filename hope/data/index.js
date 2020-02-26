$(document).ready(function(){
// menu effect
    $(window).resize(function(){
        var wd = $(window).width();
        if ( wd < 959 ){
            $("nav").css("left","100%");
            $(".menu").removeClass("active");
        }
        else {
            $("nav").css("left","auto");
        }
    });
    $(window).scroll(function(){
        var wd = $(window).width();
        var ht = $(window).height();
        var st = $(window).scrollTop();
        if ( st > ht*2/3 ){
            $("#profileImg, #profileCon").css({"opacity":"1", "transform":"translateX(0)"});
            if ( wd >= 960 ){
                $(".gnb a").slice(1).addClass("text_outline");
            }
        }
        else {
            $(".gnb a").slice(1).removeClass("text_outline");
        }
    });
/*
// profile page effect( body scroll event isn't working )
    $("html, body").scroll(function(){
        var ht = $(window).height();
        var pbofs = $("#profileBox").offset().top; //윈도우 기준이 아닌 문서 기준의 절대값이 표현되고 있다. 바디 스크롤 이벤트가 안 되는 이유와 연관이 있지 않을까?
        if ( pbofs < ht*2/3 ){
            $("#profileImg, #profileCon").css({"opacity":"1", "transform":"translateX(0)"});
        }
    });
*/
    var sw = false;
    $(".menu").click(function(){
        if( sw==false ){
            $(this).addClass("active");
            $(".gnb a").slice(1).removeClass("text_outline");
            $("nav").css("left","0");
        } else {
            $(this).removeClass("active");
            $("nav").css("left","100%");
        } sw=!sw;
    });
    $(".gnb a").click(function(){
        var wd = $("body").width();
        if ( wd < 959 ){
            sw=false;
            $("nav").css("left","100%");
            $(".menu").removeClass("active");
        }
    });
// skill button effect
   $(".skill_btn").click(function(){
        var tar = $(this).find("span");
        var dv = $(this).siblings(".progress").attr("data-value");
        var sc = 40;
        function score(){
            if( dv>sc++ ){
               tar.text(sc+"%");
               setTimeout(score,30);
            } 
        } score();
        $(this).siblings(".progress").find(".progressBar").css("width", dv+"%");
        $(this).siblings(".descript").slideDown(1000);
        $("#skills h2").removeAttr("data-content");
   });
// works #kinds btn 
    $("#kinds li").click(function(){
        var kind = $(this).text();
        $("#list li").css("display","none");
        $("#list li").filter("."+kind).css("display","block");
        if ( kind == "all" ){
            $("#list li").css("display","block");
        }
    });
// class color
    $(".color").each(function(){
        var color = $(this).text();
        $(this).css("background-color", color);
        if( color == "#fff" ){
            $(this).css({"border":"2px solid #000", "box-sizing":"border-box"});
        }
    });
// overlay effect
    $("#list li").click(function(){
        var sct = $("html").scrollTop();
        var tarId = $(this).attr("class")+$(this).attr("data-num");
        $(".overlay").stop().fadeIn(300).css({"top":"sct","position":"fixed"});
        $("[data-id="+tarId+"]").css("display","flex");
    });
    $("#close").click(function(){
        $(".overlay").stop().fadeOut(300).css({"top":"0","position":"absolute"});
        $(".overlay_item").fadeOut();
    });
});