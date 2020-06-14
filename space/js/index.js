(()=>{

    const nav = document.querySelector('nav');
    const gnb = document.querySelector('.gnb');
    const gnbList = gnb.children;
    const menuBtn = document.querySelector('#icon_moon');
    const breadIcon = document.querySelector('#icon_fishing');
    const worksTab = document.querySelector('.tab');
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
        // set planets position at section-2
        for( i=0; i<planets.length; i++ ){
            const datumPointX = planetsBox.offsetWidth/2 - planets[0].offsetWidth/2;
            const datumPointY = planetsBox.offsetHeight/2 - planets[0].offsetHeight/2;
            planetsBox.style.transform = `rotateZ(-50deg)`;
            planets[i].style.top = `${datumPointX}px`;
            planets[i].style.left = `${datumPointY}px`;
        }
        playAnimation();
    }

    function menuHandler(){
        if (!menu){
            nav.style.transform = 'translateX(0%)';
            menuBtn.style.animation = 'circle 1.5s 1 ease-out';
            for( i=0; i<gnbList.length; i++ ){
                gnbList[i].style.transitionDelay = `${0.2*i}s`;
                gnbList[i].style.transform = `translate3d(0, 0, 0)`;
                gnbList[i].style.opacity = 1;
            }
            setTimeout(setBread, 1500);
            menu = true;
        } else {
            menu = false;
            setBread();
            menuBtn.style.animation = 'moon_scale 5s infinite linear';
            let reverseNumber = 0;
            for( i=gnbList.length-1; i>=0; i-- ){
                reverseNumber++
                gnbList[i].style.transitionDelay = `${0.2*reverseNumber}s`;
                gnbList[i].style.transform = `translate3d(300px, 0, 0)`;
                gnbList[i].style.opacity = 0;
            }
            setTimeout(()=>{ 
                nav.style.transform = 'translateX(100%)';
            }, 1200);
        }
    }

    function setBread(){
        const obj = gnbList[currentSection];
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
        const tab = e.target.parentNode;
        const itemBox = document.querySelector('.grid');
        const idx = getIndex(e);
        let tabList = [];
        let itemList = [];

        if( e.target.nodeName === 'UL' ) return;

        for(i=0; i<tab.children.length; i++){
            tabList.push(tab.children[i]);
            tabList[i].classList.remove('on');
        }
        e.target.classList.add('on');

        for(i=0; i<itemBox.children.length; i++){
            itemList.push(itemBox.children[i]);
            itemList[i].classList.remove('on');
        }
        switch(idx){
            case 0:
                itemList = itemList.filter(item => item.classList.contains('responsive'));
                break;
            case 1:
                itemList = itemList.filter(item => item.classList.contains('mobile'));
                break;
            case 2:
                itemList = itemList.filter(item => item.classList.contains('desktop'));
                break;
        }
        itemList.forEach(item=>item.classList.add('on'));
    }

    
    function playAnimation(){
        switch(currentSection){
            case 2:
                for( i=0; i<planets.length; i++ ){
                    const rotateZ = 300/planets.length * i;
                    planets[i].style.transitionDelay = `${0.3*i}s`;
                    planets[i].style.transform = `rotateZ(${rotateZ}deg) translate3d(${planetsBox.offsetWidth/2}px, 0, 0)`;
                }
                
                break;
        }
    }

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

})();