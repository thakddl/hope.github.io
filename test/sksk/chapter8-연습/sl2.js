(function($){
    $.fn.sl = function(option){
        var vs = $(this);
        var lrBtn = option.lr_btn;
        if (!lrBtn){ lr_btn=false; }
        if (lrBtn){
            var btn = "<section class='btn_box'>";
            btn += "<button class='left'>◀</button>";
            btn += "<button class='right'>▶</button>";
            btn += "</section>";
            vs.after(btn);
        }
        var cycle = option.cycle; //애니메이션 자동슬라이딩 주기
        if (!cycle){cycle=3500;}
        var ani = option.ani; //한번의 슬라이딩시간
        if (!ani){ani=800;}
        var item = option.item; //슬라이딩할 이미지 박스의 각 선택자
        if(!item){item="a";}
        var imgbox = option.imgbox; //슬라이딩할 이미지 박스선택자
        if (!imgbox){imgbox=".img_box";}
        var box = vs.find(imgbox);
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