$(document).ready(function(){
    var inp = document.forms['cal'];
    var input = document.getElementsByTagName('input');
    var cls_btn = document.getElementById("bt1");
    var result_btn = document.getElementById("bt19");

    function clr(){ inp['result'].value = 0;}

    function calc(value){
        if(inp['result'].value == 0){ inp['result'].value='';}
        inp['result'].value += value;
    }

    function my_result(){
        var result = document.forms['cal']['result'];
        var calc = eval(result.value);
        inp['result'].value = calc;
    }

    for(var i=0; i<input.length;i++){
        if(input[i].value != '=' && input[i].value !='clear'){
            input[i].onclick = function(){ calc(this.value);}
        }
    }

    cls_btn.onclick = function(){clr();}
    result_btn.onclick = function(){
        try{ my_result();}
        catch(err){ var result = inp['result']; result.value = '입력오류';}
    }
});