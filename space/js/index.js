(()=>{

    const nav = document.querySelector('nav');
    const gnb = document.querySelector('.gnb');
    const menuBtn = document.querySelector('#icon_moon');
    const cursor = document.querySelector('#icon_cursor');
    const breadIcon = document.querySelector('#icon_fishing');
    const profileBox = document.querySelector('#profile');
    const idenBox = document.querySelector('#iden_box');
    const abilitiesTab = document.querySelector('#section-2 .tab');
    const worksTab = document.querySelector('#section-3 .tab');
    const planetsBox = document.querySelector('#planets_box');
    const planets = planetsBox.children;

    let currentSection = 0;
    let menu = false;
    let wheelDelta = 0;

    const sectionInfo = [
        {//0
            sectionTop: 0,
            sectionHeight: 0
        },
        {//1
            sectionTop: 0,
            sectionHeight: 0
        },
        {//2
            sectionTop: 0,
            sectionHeight: 0
        },
        {//3
            sectionTop: 0,
            sectionHeight: 0
        },
        {//4
            sectionTop: 0,
            sectionHeight: 0
        },
    ];

    function setBase(){
        // set sectionInfo
        const section = document.querySelector('main').children;
        for(i=0; i<section.length; i++){
            sectionInfo[i].sectionTop = section[i].offsetTop;
            sectionInfo[i].sectionHeight = section[i].offsetHeight;
        }
        //set current section
        let prevScrollHeight = 0;
        for(i=0; i<sectionInfo.length; i++){
            prevScrollHeight += sectionInfo[i].sectionHeight;
            if ( prevScrollHeight-(innerHeight/3) > pageYOffset ) {
                currentSection = i;
                break;
            } 
        }
        // set section-1
        if ( currentSection !== 1 ){
            let reverseNumber = 0;
            idenBox.classList.remove('on');
            for( i=profileBox.children.length-1; i>=0; i-- ){
                reverseNumber++
                profileBox.children[i].style.transitionDelay = `${0.2*reverseNumber}s`;
                profileBox.children[i].classList.remove('on');
            }
        }
        // set planets position at section-2
        for( i=0; i<planets.length; i++ ){
            const datumPointX = planetsBox.offsetWidth/2 - planets[0].offsetWidth/2;
            const datumPointY = planetsBox.offsetHeight/2 - planets[0].offsetHeight/2;
            planets[i].style.top = `${datumPointX}px`;
            planets[i].style.left = `${datumPointY}px`;
        }
        playAnimation();
    }

    function menuHandler(){
        if (!menu){
            nav.style.transform = 'translateX(0%)';
            menuBtn.style.animation = 'circle 1.5s 1 ease-out';
            for( i=0; i<gnb.children.length; i++ ){
                gnb.children[i].style.transitionDelay = `${0.2*i}s`;
                gnb.children[i].style.transform = `translate3d(0, 0, 0)`;
                gnb.children[i].style.opacity = 1;
            }
            setTimeout(setBread, 1500);
            menu = true;
        } else {
            menu = false;
            setBread();
            menuBtn.style.animation = 'moon_scale 5s infinite linear';
            let reverseNumber = 0;
            for( i=gnb.children.length-1; i>=0; i-- ){
                reverseNumber++
                gnb.children[i].style.transitionDelay = `${0.2*reverseNumber}s`;
                gnb.children[i].style.transform = `translate3d(300px, 0, 0)`;
                gnb.children[i].style.opacity = 0;
            }
            setTimeout(()=>{ 
                nav.style.transform = 'translateX(100%)';
            }, 1200);
        }
    }

    function setBread(){
        const obj = gnb.children[currentSection];
        if (menu){
            breadIcon.style.opacity = 1;
            breadIcon.style.top = `${obj.offsetTop - 15}px`;
            breadIcon.style.left = `${obj.offsetLeft + obj.offsetWidth - 15}px`;
        } else { breadIcon.style.opacity = 0; }
    }

    function getIndex(e){
        const parent = e.target.parentNode;
        const child = parent.children;
        for( i=0; i<child.length; i++ ){
            if( e.target === child[i] ){
                return i;
            }
        }
    }
    
    function scrollToMenu(e){
        if( e.target.nodeName !== 'UL' ){
            const idxNum = getIndex(e);
            window.scrollTo({
                top:sectionInfo[idxNum].sectionTop,
                behavior: 'smooth'
            })
        };
    }

    $(window).on("mousewheel", function(e){//jQuery
        return wheelDelta = e.originalEvent.wheelDelta;
    });
    function autoScroll(){
        if( wheelDelta < 0 ){
            wheelDelta = 0;
            scrollTo({
                top: sectionInfo[currentSection+1].sectionTop,
                behavior: 'smooth'
            });
        } else if ( wheelDelta > 0 ) {
            wheelDelta = 0;
            scrollTo({
                top: sectionInfo[currentSection-1].sectionTop,
                behavior: 'smooth'
            });
        }
    }

    function tabOn(e){
        let target = e.target
        let tab = e.currentTarget;
        let itemBox = tab.parentNode.querySelector('.tab_items');
        let dataTab;
        let dataItem;
        if( e.target === e.currentTarget ) return;
        if( target.nodeName !== 'BUTTON' ){ target = target.parentNode; };
        console.log(target,e.currentTarget)

        for(i=0; i<tab.children.length; i++){
            tab.children[i].classList.remove('on');
        }
        target.classList.add('on');
        for(i=0; i<itemBox.children.length; i++){
            itemBox.children[i].classList.remove('on');
            dataTab = target.dataset.tab;
            dataItem = itemBox.children[i].dataset.item;
            if ( dataTab === dataItem ){
                itemBox.children[i].classList.add('on');
            }
        }
    }

    
    function playAnimation(){
        switch(currentSection){
            case 1:
                idenBox.classList.add('on');
                for(i=0; i<profileBox.children.length; i++){
                    profileBox.children[i].style.transitionDelay = `${0.2*i}s`;
                    profileBox.children[i].classList.add('on');
                }
                break;
            case 2:
                for( i=0; i<planets.length; i++ ){
                    const rotateZ = 270/planets.length * i;
                    planets[i].style.transitionDelay = `${0.3*i}s`;
                    planets[i].style.transform = `rotateZ(${rotateZ}deg) translate3d(${planetsBox.offsetWidth/2}px, 0, 0)`;
                }
                
                break;
            case 4:
                const rocket = document.querySelector('#icon_rocket');
                rocket.classList.add('on');
                break;
        }
    }
    let totalDeg = -45;
    function planetsAni(e){
        const datumUpLine = planetsBox.offsetTop + planetsBox.offsetHeight*0.4;
        const datumDownLine = planetsBox.offsetTop + planetsBox.offsetHeight*0.7;
        const datumDeg = 270/planetsBox.children.length;
        if ( e.clientY < datumUpLine ){
            if ( totalDeg === 0 ) return;
            totalDeg += datumDeg;
        } 
        else if ( e.clientY > datumDownLine ){
            if ( totalDeg === -datumDeg * (planetsBox.children.length-1) ) return;
            totalDeg -= datumDeg;
        }
        planetsBox.style.transform = `rotateZ(${totalDeg}deg)`;
        console.log(datumUpLine,datumDownLine)
    }

    planetsBox.addEventListener('mousemove',(e)=>{
        planetsAni(e)
    });
    window.addEventListener('mousemove',(e)=>{
        cursor.style.top = `${e.pageY+10}px`;
        cursor.style.left = `${e.pageX+10}px`;
    });
    window.addEventListener('resize',()=>{
        setBase();
        setBread();
    });
    window.addEventListener('scroll', ()=>{
        setBase();
        setBread();
        if ( innerWidth>757 && innerHeight>750 ){ autoScroll(); };
    });
    menuBtn.addEventListener('click', menuHandler);
    gnb.addEventListener('click', scrollToMenu);
    worksTab.addEventListener('click', tabOn);
    abilitiesTab.addEventListener('click', tabOn);

})();