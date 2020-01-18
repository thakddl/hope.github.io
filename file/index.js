$(document).ready(function(){
  //menu call
  var sw=true;
  $("#moon").click(function(){
    $("#info").fadeOut(500);
    if(sw==true){
      $("#moon").css("animation", "circle 6s infinite linear");
      for(var a=0; a<5; a++){
        $(".gnb li:eq("+a+")").css({"transform":"translateX(0px)", "opacity":"1", "transition-delay":a*0.4+"s"});
      }
    } else{
      $("#moon").css("animation", "scale 4s infinite linear");
      var d = 0;
      for(var a=4; a>-1; a--){
        d++
        $(".gnb li:eq("+a+")").css({"transform":"translateX(300px)", "opacity":"0", "transition-delay":d*0.3+"s"}
        );
      }
    } sw=!sw;
  });
  // menu btn
  $(".gnb li").click(function(){
    var idx = $(this).index();
    $("body, html").not(":animated").animate({"scrollTop":idx*ht+"px"}, 900, 'easeOutQuad');
  });

  $("#ability svg").css({"position":"absolute", "cursor":" pointer"});
  $("#ability svg").hover(function(){
    $(".planet_tit")
  });
  // mousewheel
  var ht = parseInt($(window).height());
  $(window).on("mousewheel", function(e){
    if(e.originalEvent.wheelDelta < 0){
      $("#info").fadeOut(500);
      $("body, html").not(":animated").animate({"scrollTop":"+="+ht+"px"}, 900, 'easeOutQuad');
    } else {
      $("html, body").not(":animated").animate({"scrollTop":"-="+ht+"px"}, 900, 'easeOutQuad')
    }
  });
  //works hover effect
  $(".me").mouseover(function(){
    $("#charlee").attr("src","./data/somang.png");
    $("#hover").text("Just tell me your style what you want.").css({"transform":"rotateZ(10deg) translateY(-150%) translateX(15%)", "font-size":"24px"});
  });
  $(".me").mouseout(function(){
    $("#charlee").attr("src","./data/character lee.png");
    $("#hover").text("Mouseover Me ! !").css({transform:"rotateZ(65deg)","font-size":"22px"});
  });
});