(function($){
    $.fn.box = function(option){
        var btn = $(this);
        var tar = $(option.tar); 
        var ef = option.ef;
        if(!ef) { ef = "fade"; };
        $(this).click(function(){
            if (ef == "fade"){
                tar.fadeToggle(600);
            } else if (ef == "slide") {
                tar.slideToggle(600);
            } else if (ef == "toggle"){
                tar.Toggle(600);
            }
        });
    }
}(jQuery));