(()=>{
    
    let currentSection = 0;
    let menu = false;
    
    const nav = document.querySelector('nav'),
    gnb = document.querySelector('.gnb'),
    gnbList = gnb.children,
    menuBtn = document.querySelector('#icon_moon'),
    breadIcon = document.querySelector('#icon_fishing');
    
    function setBase(){
        //set current section
        const section = document.querySelector('main').children;
        let prevScrollHeight = 0;
        for(i=0; i<section.length; i++){
            prevScrollHeight += section[i].offsetHeight;
            if ( prevScrollHeight > pageYOffset ) {
                currentSection = i;
                break;
            } 
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
    function menuHanddler(){
        if (!menu){
            nav.style.transform = 'translateX(0%)';
            for(i=0; i<gnbList.length; i++){
                gnbList[i].style.transitionDelay = `${0.2*i}s`;
                gnbList[i].style.transform = `translate3d(0, 0, 0)`;
                gnbList[i].style.opacity = 1;
            }
            menu = true;
            setTimeout(setBread, 1500);
        } else {
            var a = 0;
            for(i=gnbList.length-1; i>=0; i--){
                a++
                gnbList[i].style.transitionDelay = `${0.2*a}s`;
                gnbList[i].style.transform = `translate3d(300px, 0, 0)`;
                gnbList[i].style.opacity = 0;
            }
            setTimeout(()=>{ 
                nav.style.transform = 'translateX(100%)';
                setBread();
            }, 1500);
            menu = false;
        }
    }
    function getIndex(elem){
        i=0;
        while((elem = elem.previousSibling)!=null){
            i++;
        }
        return i;
    }
    function menuTo(e){
        // getIndex(e.target);
        console.log(getIndex(e.target));
    }
    window.addEventListener('scroll', ()=>{
        setBase();
        setBread();
        
    });
    window.addEventListener('resize',()=>{
        setBase();
        setBread();
        
    });
    menuBtn.addEventListener('click', menuHanddler);
    gnb.addEventListener('click', menuTo);
})();