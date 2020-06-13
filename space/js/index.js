(()=>{
    
    let currentSection = 0;

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

    window.addEventListener('resize',()=>{
        setBase();
    });
    window.addEventListener('scroll', ()=>{
        setBase();
    });
})();