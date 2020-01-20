$(document).ready(function(){
    sw=1
    $("#t_btn2").click(function(){
        $("#ck1").prop("checked",false);
    });
    $("#t_btn1").click(function(){
        sw=1
        $("#ck2").prop("checked",false);
        if(sw==1){$("#sign").removeClass("fa-sign-out-alt").addClass("fa-sign-in-alt");}
    });
    $("#t_btn2").click(function(){
        if(sw==1){$("#sign").removeClass("fa-sign-in-alt").addClass("fa-sign-out-alt");}
        else {$("#sign").removeClass("fa-sign-out-alt").addClass("fa-sign-in-alt");}
        sw*=-1
    })
});