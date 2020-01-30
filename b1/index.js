$(document).ready(function(){
    function ani(){
        $(".img_box").not(":animated").animate({"margin-left":"-100%"},900, function(){
            $(".img_box li").eq(0).appendTo($(".img_box"));
            $(".img_box").css("margin-left","0");
            $(".btn_box li").eq(0).appendTo($(".btn_box"));
            $(".btn_box li").eq(0).addClass("on");
            $(".btn_box li").not(":first-child").removeClass("on");
        });
    }
    var intv = setInterval(function(){ ani(); },4000);
    
    $(".btn_box li").click(function(){
        clearInterval(intv);
        var idx = $(this).index() - 1;
        for(var i=0; i<idx; i++){
            $(".img_box li").eq(0).appendTo($(".img_box"));
            $(".btn_box li").eq(0).appendTo($(".btn_box"));
        }
        ani();
        intv = setInterval(function(){ ani(); },4000);
    });
    // var ht = parseInt($(window).height());
    // $("#totop").css("display","none");
    // $(window).scroll(function(){
    //    var sc = parseInt($(window).scrollTop());
    //    if(sc>=ht){
    //        $(".lst_btn").stop().animate({"left":"30px"},500);
    //        $("#totop").fadeIn();
    //    } else {
    //        $(".lst_btn").stop().animate({"left":"30px"},500);
    //        $("#totop").fadeOut();
    //    }    
    // });    
});
