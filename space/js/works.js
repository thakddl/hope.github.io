(()=>{

    const nav = document.querySelector('nav');
    const gnb = document.querySelector('.gnb');
    const gnbList = gnb.children;
     const hoverIcon = document.querySelector('#icon_hi');

    function menuHoverEvent(e){
        const obj = e.target;
        if( e.target.nodeName === 'LI' ){
            hoverIcon.style.top = `${obj.offsetTop}px`;
            hoverIcon.style.left = `${obj.offsetLeft-40}px`;
            setTimeout(()=>{ hoverIcon.style.opacity = 1; },100);
        } else {
            hoverIcon.style.opacity = 0; 
        }
    }

    gnb.addEventListener('mouseover', menuHoverEvent);
    gnb.addEventListener('mouseout', menuHoverEvent);

})();

                
                // const smallBox = document.querySelector('#planets_box > li');
                // pos = (smallBox.offsetWidth/(2*planetsBox.offsetWidth))*100;
                // pos = 50 - pos;

                // for(j=0; j<planets.length; j++) {

                //     planets[j].style.top = pos + '%';
                //     planets[j].style.left = pos + '%';
                // }

                // for( i=0; i<planets.length; i++ ){
                    
                //     const rotateZ = 360/planets.length * i;
                //     planets[i].style.transitionDelay = `${0.3*i}s`;
                            
                //     planets[i].style.transform = `rotateZ(${rotateZ}deg) translate3d( 150%, 150%, 0)`
           
                //     console.log(positionX,rotateZ)
                // }