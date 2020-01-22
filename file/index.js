$(document).ready(function(){
  //menu call
  var sw=true;
  var ht = $(window).height(); 
  function menu()
  {
    if(sw==true){
      $("#moon").css("animation", "circle 4s 1 ease-out");
      for(var a=0; a<5; a++){
        $(".gnb li:eq("+a+")").css({"transform":"translateX(0px)", "opacity":"1", "transition-delay":a*0.4+"s"});
      }
    } else{
      $("#moon").css("animation", "scale 5s infinite linear");
      var d = 0;
      for(var a=4; a>-1; a--){
        d++
        $(".gnb li:eq("+a+")").css({"transform":"translateX(300px)", "opacity":"0", "transition-delay":d*0.3+"s"}
        );
      }
    } sw=!sw;
  }
  function fishing()
  {
    var st = $("body").scrollTop(); //html은 overflow hidden상태이므로 스크롤 불가능 
    var idx = st/ht;
    tar = $(".gnb li:eq("+idx+")");
    tar_idx = tar.index();
    var lf=tar.offset().left;
    var wd=tar.width();
      $("#fishing").stop().fadeIn(500).css( {"left": lf+wd-10+"px"} );
      $("#float").stop().fadeOut(1000);
  }
  //fishing first position
  var st = $("body").scrollTop(); //html은 overflow hidden상태이므로 스크롤 불가능 
  var idx = st/ht;
  tar = $(".gnb li:eq("+idx+")");
  tar_idx = tar.index();
  var lf=tar.offset().left;
  var wd=tar.width();
  $("#fishing").stop().css( {"left": lf+wd-10+"px"} );
  //moon cilck effect
  $("#moon").click(function(){
    $("#info").fadeOut(500);
    if ( sw ){
      $("#hide").css("display","block");
      setTimeout(menu,10);
      setTimeout(fishing,3000);
    } 
    else { menu();
      setTimeout(function(){$("#fishing").fadeOut();},1500);
      setTimeout(function(){$("#hide").css("display","none");}, 2400); 
    }
  });
  //scroll effect
  $("body, html").scroll(function() { 
    if(sw==false){fishing();}
  });

  // gnb li cilck & hover effect
  $(".gnb li").click(function(){
    var idx = $(this).index();
    $("body, html").not(":animated").animate({"scrollTop":idx*ht+"px"}, 900, 'easeOutQuad');
  });
  $(".gnb li").mouseover(function(){
    var lf=$(this).offset().left;
    var wd=$(this).width();
    var idx = $(this).index();
    var st = $("body").scrollTop();
    var sc_idx = st/ht;
    if( idx==sc_idx ) { $("#float").stop().fadeIn(200).css({"animation":"rotate 2s infinite linear", "left": lf-50+"px"}) }
    else {
      $("#float").stop().fadeIn(200).css({"animation":"float 2s infinite linear", "left": lf+wd+10+"px"});
    }
  });
  $(".gnb li").mouseout(function() {
    $("#float").stop().fadeOut(200);
  });

  // mousewheel
  $(window).on("mousewheel", function(e){
    if(e.originalEvent.wheelDelta < 0){
      $("#info").fadeOut(500);
      $("body, html").not(":animated").animate({"scrollTop":"+="+ht+"px"}, 900, 'easeOutQuad');
    } else {
      $("html, body").not(":animated").animate({"scrollTop":"-="+ht+"px"}, 900, 'easeOutQuad')
    }
  });

//planets control
  sw2=false;
  $("#ring").click(function(){
    sw2=true;
    $("#ring_wrap").css({"width":"25vh", "heigth":"25vh", "top":"22%", "left":"15%" });
    $("#ring_tit").text("Cilck planets.");
    $("#planet_box").css({"width":"87%", "transform":"translate(0%)"});
    $("#ability_box li").stop().hide(1000); 
  });
  $(".planet_wrap").click(function(){
    sw2=false;
    $("#ring_wrap").css({"width":"21vh", "heigth":"21vh", "top":"17%", "left":"9%"});
    var name = document.getElementById("ring_tit");
    var idx = $(this).index();
    var arr = [90,85,73,85,65,72];
    var score = arr[idx]; var x = 40;
    function counter(){
    if(sw2==true){ return false; }//or x=score;
    else if ( x++<score ) {
      name.innerText = x+"%";
      setTimeout(counter,1);
    }  
    } counter();
    $("#planet_box").css({"width":"60%", "transform":"translate(25%)"});
    $("#ability_box li:eq("+idx+")").stop().show(1000);
    $("#ability_box li:eq("+idx+")").siblings().stop().hide(1000);
  });
  //works hover effect
  $(".me").mouseover(function(){
    $("#charlee").attr("src","./data/somang.png").css({"height":"77vh","margin-top":"-2vh","margin-left":"-1vw"});
    $("#hover").text("Just tell me your style what you want.").css({"transform":"rotateZ(10deg) translateY(-150%) translateX(15%)", "font-size":"24px"});
  });
  $(".me").mouseout(function(){
    $("#charlee").attr("src","./data/character lee.png").css({"height":"70vh","margin-top":"0vh","margin-left":"0vw"});
    $("#hover").text("Mouseover Me ! !").css({transform:"rotateZ(65deg)","font-size":"22px"});
  });
});
