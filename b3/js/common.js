// menu button when max-width 900px
const menuBtn = document.querySelector('.m_btn');
const gnb = document.querySelector('.gnb');
const span1 = document.querySelector('.m_btn .line1');
const span2 = document.querySelector('.m_btn .line2');
const span3 = document.querySelector('.m_btn .line3');
let active = false;

const menuBtnOffset = menuBtn.offsetTop;

function openMenu(){
    active = true;
    gnb.style.transform = 'translateX(0)';
    span1.style.transform = 'translateY(3px) rotateZ(45deg)';
    span2.style.opacity = 0;
    span3.style.transform = 'translateY(-3px) rotateZ(-45deg)';
}
function closeMenu(){
    active = false;
    const menuWidth = gnb.style.width;
    gnb.style.transform = 'translateX(100%)';
    span1.style.transform = 'translateY(-8px) rotateZ(0deg)';
    span2.style.opacity = 1;
    span3.style.transform = 'translateY(8px) rotateZ(0deg)';
}
function moveMenu(){
    const scrollHeight = pageYOffset;
    // console.log(scrollHeight, menuBtnOffset)
    if ( scrollHeight > menuBtnOffset ){
        menuBtn.style.position = 'fixed';
        // menuBtn.style.top = 'rem';
    } else {
        menuBtn.style.position = 'absolute';
        // menuBtn.style.top = 'rem';
    }
}
menuBtn.addEventListener('click', ()=>{
    if (active===false){ openMenu() }
    else { closeMenu() };
})
window.addEventListener('scroll', moveMenu )
window.addEventListener('load',()=>{
    setTimeout(()=>{
        const loader = document.querySelector('.loading');
        document.body.classList.remove('before-load');
        loader.classList.add('blind');
    },1500)
})
