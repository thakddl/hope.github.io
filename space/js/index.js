(()=>{
    
    let currentSection = 0;
    let menu = false;
    
    const nav = document.querySelector('nav'),
    gnb = document.querySelector('.gnb'),
    gnbList = gnb.children,
    menuBtn = document.querySelector('#icon_moon'),
    breadIcon = document.querySelector('#icon_fishing'),
    hoverIcon = document.querySelector('#icon_hi');

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

    function getIndex(e){
        const obj = e.target,
        parent = obj.parentNode,
        eventChild = parent.children;
        for(i=0;i<eventChild.length;i++){
            if(obj===eventChild[i]){
                return i;
            }
        }
    }

    function menuHanddler(){
        if (!menu){
            nav.style.transform = 'translateX(0%)';
            menuBtn.style.animation = 'circle 1.5s 1 ease-out';
            for(i=0; i<gnbList.length; i++){
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
            var a = 0;
            for(i=gnbList.length-1; i>=0; i--){
                a++
                gnbList[i].style.transitionDelay = `${0.2*a}s`;
                gnbList[i].style.transform = `translate3d(300px, 0, 0)`;
                gnbList[i].style.opacity = 0;
            }
            setTimeout(()=>{ 
                nav.style.transform = 'translateX(100%)';
            }, 1200);
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

    function setBread(){
        const obj = gnbList[currentSection];
        if (menu){
            breadIcon.style.opacity = 1;
            breadIcon.style.top = `${obj.offsetTop - 15}px`;
            breadIcon.style.left = `${obj.offsetLeft + obj.offsetWidth - 15}px`;
        } else { breadIcon.style.opacity = 0; }
    }
    function sectionPosition(e){
        const obj = e.target;
        if( e.target.nodeName === 'LI' ){
            hoverIcon.style.top = `${obj.offsetTop}px`;
            hoverIcon.style.left = `${obj.offsetLeft-40}px`;
            setTimeout(()=>{ hoverIcon.style.opacity = 1; },100);
        } else {
            hoverIcon.style.opacity = 0; 
        }
    }

    window.addEventListener('resize',()=>{
        setBase();
        setBread();
        
    });
    window.addEventListener('scroll', ()=>{
        setBase();
        setBread();
        if ( innerHeight>830 ){ autoScroll(); };
    });
    menuBtn.addEventListener('click', menuHanddler);
    gnb.addEventListener('click', scrollToMenu);
    gnb.addEventListener('mouseover', sectionPosition);
    gnb.addEventListener('mouseout', sectionPosition);

    const tab = document.querySelector('.tab');
    function tabOn(e){
        const itemBox = document.querySelector('.grid'),
        obj = e.target,
        tabList = [],
        itemList = [];

        for(i=0; i<tab.children.length; i++){
            tabList.push(tab.children[i]);
            tabList[i].classList.remove('on');
        }
        obj.classList.add('on');
        for(i=0; i<itemBox.children.length; i++){
            itemList.push(itemBox.children[i]);
            itemList[i].classList.remove('on');
        }
        console.log(tab.children.getIndex)
    }
    // var tabIdx = $(this).index();
    // if ( tabIdx==0 ){  
    //   $(".grid__item").removeClass("on");
    //   $(".grid__item").filter(".re").addClass("on");
    // } else if ( tabIdx==1 ){  
    //   $(".grid__item").removeClass("on");
    //   $(".grid__item").filter(".mo").addClass("on");
    // } else if ( tabIdx==2 ){  
    //   $(".grid__item").removeClass("on");
    //   $(".grid__item").filter(".de").addClass("on");
    // }
    tab.addEventListener('click', tabOn);
    
    let wheelDelta = 0;
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
})();