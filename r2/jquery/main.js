$(document).ready(function(){
    //북박스 인터발
    function intv(){
        $(".content_box li").eq(0).appendTo($(".content_box"));
        $(".content_box li").eq(0).addClass("on");
        $(".content_box li").eq(0).siblings().removeClass("on");
    } 
    var int = setInterval(function() { intv(); }, 3000);
    //북이미지 클릭
    $(".content_box li").click(function(){
        const idx = $(this).index();
        clearInterval(int);

        for ( i=0; i<idx; i++ ){
            $(".content_box li").eq(0).appendTo($(".content_box"));
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
        }
        int = setInterval(function() { intv(); }, 3000);
    });
    //페이지2 메뉴 버튼 클릭
    $(".con_menu li").click(function(){
        const idx = $(this).index();
        const targetNum = $("#con"+idx).index();
        clearInterval(int);
        
        for(a=0; a<targetNum; a++) {
            $(".content_box li").eq(0).appendTo($(".content_box"));
            $(".content_box li").eq(0).addClass("on");
            $(".content_box li").eq(0).siblings().removeClass("on");
        }
        int = setInterval(function() { intv(); }, 5000);
    });
});
