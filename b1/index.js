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
    setInterval(function(){ ani(); },4000);
});
