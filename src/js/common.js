$(window).ready(function(){
// 로더영역
  $(window).load(function () {
    $('.loader').addClass('ani');
    setTimeout(function () {
      $('body').removeClass('loading');
      $('body').addClass('loaded');
    }, 1300);
  });
// 메뉴버튼 활성화 상태에서 메인메뉴 href 속성 막기
  function setMainMenu(){
    let width = $('body').width();
    if ( width > 1079 ){
      $('.mainMenu').css('cursor','pointer');
    } else {
      $('.mainMenu').attr('href','#');
      $('.mainMenu').css('cursor','default');
    }
  } setMainMenu()
  $('.mainMenu').click(function(){
    if ( !$('.menuBtn').hasClass('on') ){
      let url = $(this).siblings('.subMenu').find('li:first-child a').attr('href');
      $(this).attr('href',url);
    }
  });
// global 메뉴버튼 영역
  $('.menuBtn').click(function(){
    $(this).toggleClass('on');
    $('.globalMenu').toggleClass('show');
  });
  $(window).resize(function(){
    $('.menuBtn').removeClass('on');
    $('.globalMenu').removeClass('show');
    setMainMenu();
  });
// sub-head 메뉴영역
  let siteMap = {
    company : 
    [
      { name: '인사말', url: '../company/intro.html' },
      { name: '비전 및 목표', url: '../company/vision.html' },
      { name: '연혁', url: '../company/history.html' },
      { name: '조직도', url: '../company/organization.html' },
      { name: '찾아오시는 길', url: '../company/place.html' }
    ],
    smartFactory : 
    [
      { name: '지원사업', url: '../smartFactory/smartFactory.html' },
      { name: '구축사례', url: '../smartFactory/factory_case.html' },
      { name: '인증서', url: '../smartFactory/certification.html' }
    ],
    business :
    [
      { name: '사업분야', url: '../business/business.html' }
    ],
    product :
    [
      { name: '제품소개', url: '../product/product.html' }
    ],
    support :
    [
      { name: '공지사항', url: '../support/notice.html' },
      { name: '자료실', url: '../support/reference.html' },
      { name: '채용안내', url: '../support/apply.html' }
    ]
  };
  $('.getLocal li').click(function(){
    let targetMenu = $(this).text();
    let menuName = $(this).attr('data-menuName');

    $('.menu').siblings('span').text(targetMenu);
    $('.getLocal').removeClass('on');

    $('.setLocal').empty();
    for( i = 0; i < siteMap[menuName].length; i++ )
    {
      $('.setLocal').append('<li><a href="'+siteMap[menuName][i].url+'">'+siteMap[menuName][i].name+'</a></li>');
    }
  });
  $('.bread').mouseover(function(){
    $(this).children('.menu').addClass('on');
  });
  $('.bread').mouseout(function(){
    $(this).children('.menu').removeClass('on');
  });
});