$(document).ready(function(){
// menu btn effect
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
   $(window).scroll(function(){
        var wd = $("body").width();
        var ht = $("body").height();
        var st = $("html").scrollTop();
        if ( wd >= 960 && st > ht*2/3 ){
            $(".gnb a").slice(1).addClass("text_outline");
        } 
        else {
            $(".gnb a").slice(1).removeClass("text_outline");
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
        // $("#list li").css("display","none");
        $("#list li").fadeOut(100);
        $("#list li").filter("."+kind).fadeIn(500);
        if ( kind == "all" ){
            $("#list li").fadeIn(300);
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
        $("[data-id="+tarId+"]").css("display","grid");
    });
    $("#close").click(function(){
        $(".overlay").stop().fadeOut(300).css({"top":"0","position":"absolute"});
        $(".overlay_item").fadeOut();
    });
});