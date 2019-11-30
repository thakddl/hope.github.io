$(document).ready(function(){
    function ani(){
        var a = parseInt($(".vs_fr li").width());
        $(".vs_fr").not(":animated").animate({"margin-left": -a+"px"}, 1000, function(){
            $(".vs_fr li").eq(0).appendTo($(".vs_fr"));
            $(".vs_fr").css("margin-left","0");
        });
    } setInterval(function(){ ani(); }, 3000);
});