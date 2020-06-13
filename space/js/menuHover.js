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