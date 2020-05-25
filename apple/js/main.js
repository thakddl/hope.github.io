(() => {//전역변수를 방지하기 위한 세팅

    let yOffset = 0; //window.pageYOffset
    let prevScrollHeight = 0;//현재 스크롤 위치보다 이전에 위치한 섹션들의 높이 값의 합
    let currentScene = 0; //현재 활성화 된 씬

    const sceneInfo = [
        { // 0
            type: 'sticky',
            heightMulti: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity:[0, 1]
            }
        },
        { // 1
            type: 'normal',
            heightMulti: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        { // 2
            type: 'sticky',
            heightMulti: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        { // 3
            type: 'sticky',
            heightMulti: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() { 
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightMulti * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
        //currentScene 판별
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i<sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function calcValues(values, currentYOffset){

    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        console.log(currentYOffset);
        switch (currentScene){
            case 0:
                let messageA_opacity_0 = values.messageA_opacity[0];
                let messageA_opacity_1 = values.messageA_opacity[1];
                break;
            case 1:
                break;
            case 2:
                console.log('case_2');
                break;
            case 3:
                console.log('case_3');
                break;
        }
    }

    function scrollLoop() {//액티브 중인 스크롤 판별
        //prevScrollHeight 설정
        prevScrollHeight = 0;
        for ( let i = 0; i < currentScene; i++ ){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        //currentScene 설정
        if ( yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight ){
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } 
        if ( yOffset < prevScrollHeight ) {
            if ( currentScene === 0 ) return;//모바일에서 브라우저의 바운스로 인해 마이너스가 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        playAnimation();
    }
    
    function init(){
        window.addEventListener('load', setLayout);
        window.addEventListener('resize', setLayout);
        window.addEventListener('scroll',() => {
            yOffset = window.pageYOffset;
            scrollLoop();
        });
    } init();

})();