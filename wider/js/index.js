$(".section1--contents").mouseover(function(){
  $(this).addClass('on');
});
$(".section1--contents").mouseout(function(){
  $(this).removeClass('on');
});
$("#section2 .contentBox li").mouseover(function(){
  $(this).find(".card").addClass('on');
});
$("#section2 .contentBox li").mouseleave(function(){
  $(this).find(".card").removeClass('on');
});