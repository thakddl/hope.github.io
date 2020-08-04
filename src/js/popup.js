$(document).ready(function(){
  $('.callPop').click(function(){
    $(this).siblings('.popup').slideDown(300);
  });
  $('.popup .closeBtn').click(function(){
    $('.popup').slideUp(300);
  });
});