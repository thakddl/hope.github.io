(() => {//전역변수를 방지하기 위한 세팅

    let yOffset = 0; //window.pageYOffset
    let prevScrollHeight = 0;//현재 스크롤 위치보다 이전에 위치한 섹션들의 높이 값의 합
    let currentScene = 0; //The currently active scene
    let enterNewScene = false; //It will change to ture when you enter a new scene.
    
    const sceneInfo = [
        { // 0
            type: 'sticky',
            heightMulti: 5, //브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImgs: [],
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                videoImgCount: 300,
                imgSequence: [0, 299],
                canvas_opacity_out: [1, 0, { start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
				messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
				messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
				messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
				messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
				messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
				messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
				messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
				messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
				messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
				messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
				messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
				messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
				messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
				messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }
        },
        { // 1
            type: 'normal',
            // heightMulti: 5,
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
                canvas: document.querySelector('#video-canvas-2'),
                context: document.querySelector('#video-canvas-2').getContext('2d'),
                videoImgs: [],
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .main-message.a'),
                messageB: document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC: document.querySelector('#scroll-section-2 .desc-message.c'),
                pinB: document.querySelector('#scroll-section-2 .desc-message.b .pin'),
                pinC: document.querySelector('#scroll-section-2 .desc-message.c .pin')
            },
            values: {
                videoImgCount: 960,
                imgSequence: [0, 959],
                canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
                canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
				messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
				messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
				messageA_opacity_in: [0, 1, { start: 0.15, end: 0.3 }],
				messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
				messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
				messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
				messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
				messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
				messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
				messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
				messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
				pinB_scaleY: [0.3, 1, { start: 0.6, end: 0.65 }],
				pinC_scaleY: [0.3, 1, { start: 0.87, end: 0.92 }],
				pinB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
				pinC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
				pinB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                pinC_opacity_out: [1, 0, { start: 0.95, end: 1 }]
            }
        },
        { // 3
            type: 'sticky',
            heightMulti: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvas: document.querySelector('.img-blend-canvas'),
                context: document.querySelector('.img-blend-canvas').getContext('2d'),
                imgPath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: []
            },
            values: {
                
            }
        }
    ];

    function setCanvasImages(){
        let imgElem;
        for(i=0; i<sceneInfo[0].values.videoImgCount; i++){
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726+i}.JPG`
            sceneInfo[0].objs.videoImgs.push(imgElem);
        }
        let imgElem2;
        for (i=0; i<sceneInfo[2].values.videoImgCount; i++){
            imgElem2 = new Image;
            imgElem2.src = `./video/002/IMG_${7027+i}.JPG`;
            sceneInfo[2].objs.videoImgs.push(imgElem2);
        }
        let imgElem3;
        for (i=0; i<sceneInfo[3].objs.imgPath.length; i++){
            imgElem3 = new Image;
            imgElem3.src = sceneInfo[3].objs.imgPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
    }
    
    function setLayout() { 
        //각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightMulti * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
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
        // canvas css설정
        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset){
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;//현재 씬의 스크롤 비율
        if (values.length === 3){
            //start ~ end 사이에 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart; 
            if(currentYOffset>=partScrollStart && currentYOffset<=partScrollEnd){
                rv = (currentYOffset-partScrollStart) / partScrollHeight * (values[1]-values[0]) + values[0];
            }
            else if (currentYOffset<partScrollStart){ rv = values[0]; }
            else if (currentYOffset>partScrollEnd){ rv = values[1]; };

        } else {
            rv = scrollRatio * (values[1]-values[0]) + values[0];
        }
        
        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene){
            case 0:
                let sequence = Math.round(calcValues(values.imgSequence, currentYOffset));
                objs.context.drawImage(objs.videoImgs[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                //a
                if(scrollRatio <= values.messageA_opacity_out[2].start){
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                //b
                if(scrollRatio <= values.messageB_opacity_out[2].start){
                    //in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    //out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
                //c
                if(scrollRatio <= values.messageC_opacity_out[2].start){
                    //in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    //out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
                //d
                if(scrollRatio <= values.messageD_opacity_out[2].start){
                    //in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    //out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
                break;

            case 2:
                let sequence2 = Math.round(calcValues(values.imgSequence, currentYOffset));
                objs.context.drawImage(objs.videoImgs[sequence2], 0, 0);
                if (scrollRatio <= values.canvas_opacity_in[2].end ) { objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset); }
                else { objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset); }
                //a
                if(scrollRatio <= values.messageA_opacity_out[2].start){
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
                //b
                if(scrollRatio <= values.messageB_opacity_out[2].start){
                    //in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                    objs.pinB.style.opacity = calcValues(values.pinB_opacity_in, currentYOffset);
                    console.log(calcValues(values.pinB_opacity_in, currentYOffset));
                } else {
                    //out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.opacity = calcValues(values.pinB_opacity_out, currentYOffset);
                }
                //c
                if(scrollRatio <= values.messageC_opacity_out[2].start){
                    //in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_in, currentYOffset);
                } else {
                    //out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinC.style.opacity = calcValues(values.pinC_opacity_out, currentYOffset);
                }
                break;

            case 3:
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;
                if ( widthRatio <= heightRatio ) {
                    //켄버스보다 창이 홀쭉
                    canvasScaleRatio = heightRatio;
                    console.log('h');
                } else {
                    //캔버스보다 창이 납짝
                    canvasScaleRatio = widthRatio;
                    console.log('w');
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.drawImage(objs.images[0], 0, 0);
                break;
        }
    }

    function scrollLoop() {//액티브 중인 스크롤 판별
        enterNewScene = false;
        //prevScrollHeight 설정
        prevScrollHeight = 0;
        for ( let i = 0; i < currentScene; i++ ){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }
        //currentScene 설정
        if ( yOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight ){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } 
        if ( yOffset < prevScrollHeight ) {
            enterNewScene = true;
            if ( currentScene === 0 ) return;//모바일에서 브라우저의 바운스로 인해 마이너스가 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (enterNewScene) return;
        playAnimation();
    }
    
    function init(){
        setCanvasImages();
        window.addEventListener('load', ()=>{
            sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImgs[0], 0, 0);
            setLayout();
        });
        window.addEventListener('resize', setLayout);
        window.addEventListener('scroll',() => {
            yOffset = window.pageYOffset;
            scrollLoop();
        });
    } init();

})();