var second = document.getElementById("second");
var minute = document.getElementById("minute");
var hour = document.getElementById("hour");
function clock(){
    var time = new Date();
    var hh = time.getHours();
    var mm = time.getMinutes();
    var ss = time.getSeconds();
    if(hh>12) { hh = hh-12; }
    hh=hh*360/12;
    mm=mm*360/60;
    ss=ss*360/60;
    sec.style.transform = "rotate("+ss+"deg)";
    min.style.transform = "rotate("+mm+"deg)";
    hour.style.transform = "rotate("+hh+"deg)";
}
clock();
setInterval (function(){ clock();}, 1000);