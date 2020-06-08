(() => {//전역변수를 방지하기 위한 세팅

    let yOffset = 0; //window.pageYOffset
    let prevScrollHeight = 0;//현재 스크롤 위치보다 이전에 위치한 섹션들의 높이 값의 합
    let currentScene = 0; //The currently active scene
    let enterNewScene = false; //It will change to ture when you enter a new scene.
    
    let acc = 0.1,
    delayedYOffset = 0,
    rafId, rafState;

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
                canvasCaption: document.querySelector('.canvas-caption'),
                context: document.querySelector('.img-blend-canvas').getContext('2d'),
                imgPath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg'
                ],
                images: []
            },
            values: {
                rect1X: [ 0, 0, { start: 0, end: 0 } ],
                rect2X: [ 0, 0, { start: 0, end: 0 } ],
                imgBlendHeight: [ 0, 0, { start: 0, end: 0 } ],
                canvasOffsetTop: 0,
                canvas_scale: [ 1, 0.5, { start: 0, end: 0 } ],
                canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
                canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
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
    
    function stickyMenu(){
        if ( yOffset > 44 ){
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');

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
                rv = values[0] + (currentYOffset-partScrollStart) / partScrollHeight * (values[1]-values[0]);
            }//시작값 + 증가값(partHeightRatio * 전체값)
            else if (currentYOffset<partScrollStart){ rv = values[0]; }//바운스 오류 방지
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
                // let sequence = Math.round(calcValues(values.imgSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImgs[sequence], 0, 0);
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
                // let sequence2 = Math.round(calcValues(values.imgSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImgs[sequence2], 0, 0);
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
                    // console.log(calcValues(values.pinB_opacity_in, currentYOffset));
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

                if ( scrollRatio > 0.9 ){
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;
                    if ( widthRatio <= heightRatio ) {
                        //켄버스보다 창이 홀쭉
                        canvasScaleRatio = heightRatio;
                        // console.log('h');
                    } else {
                        //캔버스보다 창이 납짝
                        canvasScaleRatio = widthRatio;
                        // console.log('w');
                    }
                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0], 0, 0);
                    
                    //캔버스 원본 크기에 맞춰 계산한 innerHeight, innerWidth
                    // console.log(recalculatedInnerWidth, recalculatedInnerHeight);
                    const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                    // rect 위치 초기값과 종료값 세팅
                    const whithRectWidth = parseInt(recalculatedInnerWidth * 0.15);
                    values.rect1X[0] = ( objs.canvas.width - recalculatedInnerWidth ) / 2;
                    values.rect1X[1] = values.rect1X[0] - whithRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whithRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whithRectWidth;
                    //좌우 흰색 박스 그리기(x y width height)
                    objs.context.fillRect(parseInt(values.rect1X[0]), 0, whithRectWidth, objs.canvas.height);
                    objs.context.fillRect(parseInt(values.rect2X[0]), 0, whithRectWidth, objs.canvas.height);
                }
                break;

            case 3:
                let step;
                // 가로 세로 꽉차게 하기
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;
                if ( widthRatio <= heightRatio ) {
                    //켄버스보다 창이 홀쭉
                    canvasScaleRatio = heightRatio;
                    // console.log('h');
                } else {
                    //캔버스보다 창이 납짝
                    canvasScaleRatio = widthRatio;
                    // console.log('w');
                }
                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.fillStyle = 'white';
                objs.context.drawImage(objs.images[0], 0, 0);
                
                //캔버스 원본 크기에 맞춰 계산한 innerHeight, innerWidth
                // console.log(recalculatedInnerWidth, recalculatedInnerHeight);
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                // rect 위치 초기값과 종료값 세팅
                const whithRectWidth = parseInt(recalculatedInnerWidth * 0.15);
                values.rect1X[0] = ( objs.canvas.width - recalculatedInnerWidth ) / 2;
                values.rect1X[1] = values.rect1X[0] - whithRectWidth;
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whithRectWidth;
                values.rect2X[1] = values.rect2X[0] + whithRectWidth;
                // 시작과 종료 지점 구하기( canvas offsetTop 값이 애니매이션의 종료시점 )
                if (!values.canvasOffsetTop){
                    values.canvasOffsetTop = (objs.canvas.offsetTop - prevScrollHeight) + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2; // U can change parent's position value to "relative" to get a relative offsetTop value at CSS. But that's a original canvas's position value.
                    values.rect1X[2].end = values.canvasOffsetTop / scrollHeight;
                    values.rect2X[2].end = values.canvasOffsetTop / scrollHeight;
                    values.rect1X[2].start = values.rect1X[2].end / 3.5;
                    values.rect2X[2].start = values.rect2X[2].end / 3.5;
                }
                //좌우 흰색 박스 그리기(x y width height)
                // objs.context.fillRect(values.rect1X[0], 0, whithRectWidth, objs.canvas.height);
                // objs.context.fillRect(values.rect2X[0], 0, whithRectWidth, objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, whithRectWidth, objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, whithRectWidth, objs.canvas.height);
                
                if ( values.rect2X[2].end > scrollRatio ) {
                    step = 1;
                    // console.log('안담', values.rect2X[2].end, scrollRatio);
                    objs.canvas.classList.remove('sticky');
                } else {
                    step = 2;
                    // console.log('닿음', values.rect2X[2].end, scrollRatio);
                    const canvasW = objs.canvas.width;
                    const canvasH = objs.canvas.height;
                    const blendHeight = calcValues(values.imgBlendHeight, currentYOffset);

                    
                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(canvasH - canvasH * canvasScaleRatio) / 2}px`;
                    // 이미지 블랜드 imgBlendHeight: [ 0, 0, { start: 0, end: 0 } ]
                    values.imgBlendHeight[0] = 0;
                    values.imgBlendHeight[1] = canvasH;
                    values.imgBlendHeight[2].start = values.rect1X[2].end;
                    values.imgBlendHeight[2].end = values.imgBlendHeight[2].start + 0.2;
                    
                    objs.context.drawImage( objs.images[1], 
                        0, canvasH-blendHeight, canvasW, blendHeight, 
                        0, canvasH-blendHeight, canvasW, blendHeight
                    );
                    if ( scrollRatio > values.imgBlendHeight[2].end ) {
                        values.canvas_scale[0] = canvasScaleRatio;
                        values.canvas_scale[1] = document.body.offsetWidth / ( canvasW * 1.5 );
                        values.canvas_scale[2].start = values.imgBlendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;
                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`
                        objs.canvas.style.marginTop = 0;
                        objs.canvasCaption.style.display = 'none';

                    } 
                    if ( scrollRatio > values.canvas_scale[2].end && 0 < values.canvas_scale[2].end ) {
                        objs.canvas.classList.remove('sticky');
                        objs.canvasCaption.style.display = 'block';
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
                        //애니메이션이 시작한 시점부터 0.4 만큼 지남
                        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
                        values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;

                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
                    }
                }
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
        if ( delayedYOffset > prevScrollHeight+sceneInfo[currentScene].scrollHeight ){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } 
        if ( delayedYOffset < prevScrollHeight ) {
            enterNewScene = true;
            if ( currentScene === 0 ) return;//모바일에서 브라우저의 바운스로 인해 마이너스가 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (enterNewScene) return;
        playAnimation();
    }

    function loop(){
        delayedYOffset = delayedYOffset + ( yOffset - delayedYOffset ) * acc;

        if (!enterNewScene) {//씬이 바뀔때 오차 없앰
            if ( currentScene === 0 || currentScene === 2 ){
                const objs = sceneInfo[currentScene].objs;
                const values = sceneInfo[currentScene].values;
                const currentYOffset = delayedYOffset - prevScrollHeight;
                let sequence = Math.round(calcValues(values.imgSequence, currentYOffset));
                // console.log(sequence) 계산 오차로 인한 버그방지
                if ( objs.videoImgs[sequence] ){ //존재할때만 그리도록
                    objs.context.drawImage(objs.videoImgs[sequence], 0, 0);
                }
            }
        }

        rafId = requestAnimationFrame(loop);//1초에 60회정도 불려짐

        if ( Math.abs( yOffset - delayedYOffset ) < 1 ){
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }
    
    function init(){
        window.addEventListener('load', ()=>{
            document.body.classList.remove('before-load');
            setLayout();
            sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImgs[0], 0, 0);
            
            let tempYOffset = yOffset;
            let tempScrollCount = 0;
            if ( yOffset > 0 ){
                let siId = setInterval(()=>{ 
                    scrollTo(0, tempYOffset)
                    tempYOffset +=2
                    tempScrollCount++
    
                    if(tempScrollCount>20){
                        clearInterval(siId);
                    }
                }, 20);
            }

            window.addEventListener('resize', ()=>{
                if ( window.innerWidth > 900 ){
                    setLayout();
                    sceneInfo[3].values.canvasOffsetTop = 0;
                }
            });
                window.addEventListener('orientationchange', ()=>{
                    setTimeout(setLayout, 300);
                });
                window.addEventListener('scroll',() => {
                    yOffset = window.pageYOffset;
                    stickyMenu();
                    scrollLoop();
                    if ( !rafState ){
                        rafId = requestAnimationFrame(loop);
                        rafState = true;
                    }
                });
                sceneInfo[3].values.canvasOffsetTop = 0;
        });
        document.querySelector('.loading').addEventListener('transitionend', (e)=>{
            document.body.removeChild(e.currentTarget);
        });
        setCanvasImages();

    } init();

})();