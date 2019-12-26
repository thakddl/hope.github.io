$(document).ready(function(){
    // 메뉴 call
    sw = true
    $(".menu_btn").click(function(){
        if (sw==true) {
            $(".menu_fr").fadeIn(400);
            $("#bar1").css({"transform":"translateY(10px) rotateZ(45deg)", "transform-origin":"50% 50%"});
            $("#bar3").css({"transform":"translateY(-10px) rotateZ(-45deg)", "transform-origin":"50% 50%"});
            $("#bar2").css("display","none");
            $("html").css("overflow","hidden");
        } else {
            $(".menu_fr").fadeOut(400);
            $("#bar1").css({"transform":"translateY(0px) rotateZ(0deg)", "transform-origin":"50% 50%"});
            $("#bar3").css({"transform":"translateY(0px) rotateZ(0deg)", "transform-origin":"50% 50%"});
            $("#bar2").css("display","block");
            $("html").css("overflow","auto");
        } sw = !sw
    });

    // spel 애니메이션
    var obj = $(".it")
    var left = parseInt(obj.offset().left);
    var top = parseInt(obj.offset().top);
    console.log(left)

    //페이지2 메뉴 버튼 호버
    $(".con_local li").mouseover(function(){
        $(this).css({"color":"#999", "font-size":"21px", "transition":"0.3s"});
    });
    $(".con_local li").mouseout(function(){
        $(this).css({"color":"#555", "font-size":"20px", "transition":"0.3s"});
    });

    //페이지2 북박스 호버
    $("#vs_book").children().mouseover(function(){
        $("#vs_book img").css({"box-shadow": "1px 0px 30px cornsilk", "transition":"0.3s"});
    });
    $("#vs_book").children().mouseout(function(){
        $("#vs_book img").css({"box-shadow": "1px 0px 10px cornsilk", "transition":"0.3s"});
    });
    $(".new_b").mouseover(function(){
        $(this).css({"box-shadow": "1px 0px 15px cornsilk", "transition":"0.3s"});
    });
    $(".new_b").mouseout(function(){
        $(this).css({"box-shadow": "1px 0px 5px cornsilk", "transition":"0.3s"});
    });
    //북박스 vs box
    function book(){
        var img = $(".con_box .on img").attr("src");
        var tit = $(".con_box .on h3").text();
        var des = $(".con_box .on p").text();
        $("#vs_img").attr("src",img);
        $("#vs_tit").text(tit);
        $("#vs_des").text(des);
    }

    //북박스 인터발
    function intv(){
        var wd = $(".con_box .on img").outerWidth()+30;
        console.log(wd);
        $(".con_box").not(":animated").animate({"margin-left":-wd+"px"}, 500, function(){
            $(".con_box li").eq(0).appendTo($(".con_box"));
            $(".con_box").css({"margin-left":"15px"});
            $(".con_box li").eq(0).addClass("on");
            $(".con_box li").eq(0).siblings().removeClass("on");
            book();
        });
    } var int = setInterval(function() { intv(); }, 5000);
    //북이미지 클릭
    $(".new_b").click(function(){
        clearInterval(int);
        var idx = $(this).parent().index();
        console.log(idx);
        for (var i=0; i<idx; i++){
            $(".con_box li").eq(0).appendTo($(".con_box"));
            $(this).parent().addClass("on");
            $(this).parent().siblings().removeClass("on");
        }
        book();
        int = setInterval(function() { intv(); }, 5000);
    });
    //페이지2 메뉴 버튼 클릭
    $(".con_local li").click(function(){
        clearInterval(int);
        var num = $(this).index();
        var it = $("#con"+num).index();
        for(a=0; a<it; a++) {
            $(".con_box li").eq(0).appendTo($(".con_box"));
            $(".con_box li").eq(0).addClass("on");
            $(".con_box li").eq(0).siblings().removeClass("on");
        }
        book();
        int = setInterval(function() { intv(); }, 5000);
    });
});
