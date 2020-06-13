(()=>{
    
    const nav = document.querySelector('nav');
    const gnb = document.querySelector('.gnb');
    const gnbList = gnb.children;
    const menuBtn = document.querySelector('#icon_moon');
    const breadIcon = document.querySelector('#icon_fishing');


    let currentSection = 0;
    let menu = false;

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

    window.addEventListener('resize',()=>{
        setBase();
        setBread();

    });
    window.addEventListener('scroll', ()=>{
        setBase();
        setBread();

    });
    menuBtn.addEventListener('click', menuHandler);
    gnb.addEventListener('click', scrollToMenu);

})();