(function($) {
    $.fn.op = function(option){
        var t1 = $(this);
        t1.mouseover(function(){
            t1.find(".opabox").not(":animated").fadeTo(300,0);
        });
        t1.mouseout(function(){
            t1.find(".opabox").not(":animated").fadeTo(300,1);
        });
    }
    $.fn.lr = function(option){
        var t2 = $(this);
        t2.mouseover(function(){
            t2.find(".opabox").not(":animated").animate({"left":"-100%"}, 300);
        });
        t2.mouseout(function(){
            t2.find(".opabox").not(":animated").animate({"left":"0"}, 300);
        });
    }
    $.fn.ud = function(option){
        var t3 = $(this);
        t3.mouseover(function(){
            t3.find(".opabox").not(":animated").animate({"top":"-100%"}, 300);
        });
        t3.mouseout(function(){
            t3.find(".opabox").not(":animated").animate({"top":"0"}, 300);
        });
    }
}(jQuery));