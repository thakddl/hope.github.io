$(document).ready(function(){
    var ht = parseInt($(window).height());
    $("#totop").css("display","none");
    $(window).scroll(function(){
//        if("#ck1").checkOn(function(){
//            
//        });
       var sc = parseInt($(window).scrollTop());
       if(sc>=ht){
           $(".lst_btn").stop().animate({"left":"30px"},500);
           $("#totop").fadeIn();
       } else {
           $(".lst_btn").stop().animate({"left":"220px"},500);
           $("#totop").fadeOut();
       }    
    });    
});  