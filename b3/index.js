$(document).ready(function(){
    function nextAni(){
        $(".slide_box").not(":animated").animate({"margin-left":"-1920px"}, 500,
        function(){
            $(".slide_box li").eq(0).appendTo($(".slide_box"));
            $(".slide_box").css("margin-left","0px");
        });
    }
    function prevAni() {
        $(".slide_box li").eq(3).prependTo($(".slide_box"));
        $(".slide_box").css("margin-left", "-1920px");
        $(".slide_box").not(":animated").animate({"margin-left":"0px"}, 500);
    }
    
    var intv = setInterval(function(){ nextAni(); }, 2900);
    $(".btn_box .prev_btn").click(function(){
        clearInterval(intv);
        prevAni();
        intv = setInterval(function(){ nextAni(); }, 2900);
    });
    $(".btn_box .next_btn").click(function(){
        clearInterval(intv);
        nextAni();
        intv = setInterval(function(){ nextAni(); }, 2900);
    });
});