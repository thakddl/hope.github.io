const num = document.querySelector('.num');
const math = document.querySelector('.math');
const submit = document.querySelector('#submit');
const topMenu = document.querySelector('.menu');

let firstNum = '', nextNum = '', resultNum;//nextNum은 y값, resultNum은 x값
let operator, menu;

function clear(){ //초기화 함수
    firstNum = '', nextNum = '', resultNum = undefined;
    operator = undefined, menu = undefined;
}

function menuHandler(e){
    menu = e.target.getAttribute('value');
    switch(menu){
        case "C": //모든 숫자 초기화
            clear(); showPrint(0); 
            break;
        case "DEL": //현재 숫자 초기화
            if ( resultNum === undefined ){ clear(); showPrint(0); } //처음 숫자일때 초기화
            else { nextNum = ''; showPrint(resultNum); }; //다음 숫자일때 초기화
            break;
        case "❤️": clear(); showPrint('vanilla script');
            break;
        case "😊": clear(); showPrint('calculator');
            break;
        case "😎": clear(); showPrint('by hope');
            break;
    }
}

function resultHandler(){
    nextNum = parseFloat(nextNum); //y값 숫자화
    switch(operator){
        case "multiply": resultNum = resultNum * nextNum; break;
        case "divide": resultNum = resultNum / nextNum; break; 
        case "subtract": resultNum = resultNum - nextNum; break;
        case "remainder": resultNum = resultNum % nextNum; break;
        case "add": resultNum = resultNum + nextNum; break;
        case "**": resultNum = resultNum ** nextNum; break;
        default : resultNum = 'Error';
    }
    showPrint(resultNum);
    operator = undefined;
    nextNum = '';
}

function operatorHandler(e){
    if(resultNum === undefined){ //x값 저장 및 숫자화
        resultNum = parseFloat(firstNum);
    }
    operator = e.target.dataset.operator; //연산 방법 저장
}

function showPrint(num){ //화면에 표기
    const result = document.querySelector('#result');
    result.value = num;
}

function getNumberHandler(e){ //버튼으로 부터 숫자 스트링으로 받음
    if(resultNum === undefined){ //x값이 없을 경우
        const xVal = e.target.getAttribute('value');
        firstNum = firstNum+xVal;
        showPrint(firstNum);
    } else {
        const yVal = e.target.getAttribute('value');
        nextNum = nextNum+yVal;
        showPrint(nextNum);
    }
}

function init(){
    num.addEventListener('click', getNumberHandler);
    math.addEventListener('click', operatorHandler);
    submit.addEventListener('click', resultHandler);
    topMenu.addEventListener('click', menuHandler);
};
init();