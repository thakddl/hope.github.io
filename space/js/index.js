(()=>{
    
    const nav = document.querySelector('nav');
    const gnb = document.querySelector('.gnb');
    const gnbList = gnb.children;
    const menuBtn = document.querySelector('#icon_moon');
    
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
            menu = true;
        } else {
            menu = false;
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

    window.addEventListener('resize',()=>{
        setBase();
    });
    window.addEventListener('scroll', ()=>{
        setBase();
    });
    menuBtn.addEventListener('click', menuHandler);
})();