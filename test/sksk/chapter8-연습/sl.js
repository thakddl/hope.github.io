(function($){
    $.fn.sl = function(option){
        var btn = "<section class='btn_box'>";
        btn += "<button class='left'>◀</button>";
        btn += "<button class='right'>▶</button>";
        btn += "</section>";
        var cycle = 3000;
        var ani = 600;
        var vs = $(this);
        var item = "a";        
        var imgbox = ".img_box";
        var box = vs.find(".img_box");
        vs.after(btn);
        var wd = parseInt(vs.width());
        var len = vs.find(item).length;
        vs.nextAll(".btn_box").find(".right").click(function(){
            clearInterval(intv);
            rMot();
            intv = setInterval(function(){rMot();}, cycle);
        });
        vs.nextAll(".btn_box").find(".left").click(function(){
            clearInterval(intv);
            lMot();
            intv = setInterval(function(){rMot();}, cycle);
        });
        function rMot(){
            box.not(":animated").animate({"margin-left": -wd+"px"}, ani, function(){
                box.find(item).eq(0).appendTo(box);
                box.css("margin-left", "0px");
            });
        }
        function lMot(){
                box.find(item).eq(len-1).prependTo(box);
                box.css("margin-left",-wd+"px");
                box.not(":animated").animate({"margin-left":"0"}, ani);
        }
        var intv = setInterval(function(){ rMot(); }, cycle);
    };
}(jQuery));