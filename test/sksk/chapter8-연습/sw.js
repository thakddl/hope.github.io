(function($) {
    $.fn.swh = function(option){
        var t = $(this);
        var tar = $(option.obj);
        var sw = true;
        t.click(function(){
            if (sw){
                tar.slideUp(400);
                t.text("열기");
            } else {
                tar.slideDown(400);
                t.text("닫기");
            }
            sw = !sw;
        });
    }
}(jQuery));