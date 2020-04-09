const canvas = document.getElementById('jsCanvas'),
    ctx = canvas.getContext('2d');
const range = document.getElementById('range'),
    mode = document.getElementById('jsMode'),
    save = document.getElementById('jsSave'),
    colors = document.getElementsByClassName('controls__color');

const INITIAL_COLOR = '#000';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){//시작점 옮기기(마우스다운 하는 순간 painting이 true로 바뀌기에 시작점이 고정된다.)
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeHandler(){
    if(filling){
        filling = false;
        mode.innerText = 'Fill';
    } else{
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClike(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){ //context menu 이벤트 제거
    event.preventDefault();
}

function saveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "painting";
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClike);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener('click', changeColor)
); //color은 Array의 각각 아이템을 뜻하는 매개변수(parameter)

if(range){
    range.addEventListener('input', handleRangeChange);
}

if(mode){
    mode.addEventListener('click', modeHandler);
}
if(save){
    save.addEventListener('click', saveClick);
}