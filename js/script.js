//jQuery
$(document).ready(function(){
    const section = $('.wrap > section'),
        sectionMenu=$('.nav_menu'),
        footer= $('.footer')

        //   console.log(section)
    let sectionSpeed = 500;
    // 각각의 섹션의 위치값이 저장되는 배열변수
    let sectionPos = [];
    let sectionIndex = 0;
     
    // 연속 스크롤 휠을 막아주는 상태 변수 
    let scrolling= false;
    // 화면너비가 1000px이하(모바일 버전)인지 아닌지 확인하는 상태변수
    let wheeling = true;

    function wheelCheckFn(){
        //브라우저의 화면 너비
        let windowWidth=window.innerWidth;
        // console.log(windowWidth)
        if(windowWidth <=700){
            wheeling = false
            sectionMenu.hide();
        }else{
            wheeling = true
            sectionMenu.show();
        }
    }
    wheelCheckFn();

    // 위치 파악(Y스크롤 이동 px)
    function resetSection() {
        $.each(section, function(index,item){
            let tempY =$(this).offset().top;
        // 소수점 있으면 정수로
            tempY =Math.ceil(tempY);
            // console.log(tempY)
            sectionPos[index] = tempY
            // console.log(sectionPos)
        })
        //footer 위치 추가 및 변경
        sectionPos[sectionPos.length] = Math.ceil(footer.offset().top)
        // console.log(sectionPos)
    }
    // 최초의 새로고침 또는 실행시 위치값 파악
     resetSection()
      // footer 추가된 section 개수
     let sectionTotal = sectionPos.length
     // $(window).resize(function(){}){}    //이벤트처리기(resize) 아래와 동일

    // 리사이즈 일어나고 0.5초 뒤 호출
    let resizeTimer;
    $(window).on('resize',function(){
        window.clearTimeout(resizeTimer)
        resizeTimer = window.setTimeout(
        resizeFunction,500)
    })

     function resizeFunction(){
        wheelCheckFn();
        resetSection();
        if(wheeling){
            // gsap.to(요소명 , duration-time(초 단위), {설정 (위치정보)})
            gsap.to($('html'), sectionSpeed / 1000, {
                scrollTop: sectionPos[sectionIndex],
                onComplete :function(){
                    scrolling = false;       
                }
            })
        }
     }

     // 마우스휠 체크

     $(window).on('mousewheel DOMMouseScroll', function(event){
        let distance = event.originalEvent.wheelDelta
        // console.log(distance)

        //화면 사이즈에 따른 작동여부
        if(wheeling !== true) {
            return
        }
        //연속 휠 막아준다.
        if(scrolling){
            return;
        }
        scrolling = true;
        if(distance < 0){
            sectionIndex++;
            if(sectionIndex >= sectionTotal){
                sectionIndex = sectionTotal-1
            }
            console.log(sectionIndex)
        }else{
            sectionIndex--;
            if(sectionIndex <=0){
                sectionIndex=0;
            }
            console.log(sectionIndex)
        }
        sectionColor();

        gsap.to($('html'), sectionSpeed / 1000, {
            scrollTop:sectionPos[sectionIndex],
            onComplete:function(){
                scrolling=false;
            }
        })
        
     })

     // 섹션메뉴 클릭 시 섹션 이동 
     const sectionLink=$('.nav_menu a')
     $.each(sectionLink, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            // console.log(index)
            moveSection(index)
        })
     })
    
     // 탑버튼(퀵메뉴) 클릭 시 섹션 이동 
     const quickLink=$('#quick ul li')
     $.each(quickLink, function(index, item){
        $(this).click(function(event){
            event.preventDefault();
            // console.log(index)
            moveSection(index)
        })
     })

      // 모바일케뉴 클릭 시 섹션 이동 
      const mbtnlink=$('.m-nav ul li')
      $.each(mbtnlink, function(index, item){
         $(this).click(function(event){
             event.preventDefault();
             // console.log(index)
             moveSection(index)
         })
      })

     function moveSection(_index){
        //보여질 section번호(index)를 지정한다.
        sectionIndex = _index;
        sectionColor();
        // 해당 섹션 번호로 섹션 이동
        gsap.to($('html'), sectionSpeed / 1000, {
            scrollTop:sectionPos[sectionIndex],
            onComplete:function(){
                scrolling=false;
            }
        })
     }

     function sectionColor(){
        sectionLink.removeClass('section-menu-active')
        sectionLink.eq(sectionIndex).addClass('section-menu-active')
     }
    sectionColor();

    // 모바일 nav
    $('.m-btn').click(function(){
        $('.m-btn').toggleClass('on')
        $('.m-nav').toggleClass('on')
        $('.window').fadeToggle();
    })

    $('.m-nav ul li a').click(function(){
        $('.m-nav').removeClass('on')
    })
  
    $(window).resize(function(){
        let windowWidth =$(window).width();
        if(windowWidth > 640){
            $('.m-btn').removeClass('on')
            $('.m-nav').removeClass('on')
            $('.window').fadeOut();
        }
    })
     
     // 텍스트 스크롤
    const pTag1 = document.querySelector('.first-parallel')
    const textArr1 = '♥ WHO DO YOU THINK I AM? ■ THE WORLD IS A PLAYGROUND.'.split(' ')

    let count1 = 0;
    initTexts(pTag1, textArr1)

    function initTexts(element, textArray) {
        textArray.push(...textArray)
        for(let i=0; i<textArray.length; i++) {
            element.innerText += `${textArray[i]}\u00A0\u00A0\u00A0\u00A0`
        }
    }
    function marqueeText(count, element, direction) {
        console.log(element.clientWidth)
        if(count > element.clientWidth) {
            element.style.transform = `translate3d(0,0,0)`
            count = 0
        }
        element.style.transform = `translate3d(${direction * count}px, 0, 0)`
    
        return count
    }
        
    function animate() {
        count1++
        count1 = marqueeText(count1, pTag1, -1)
        window.requestAnimationFrame(animate)
    }
    animate();

    //몰피즘
    VanillaTilt.init(document.querySelectorAll(".card ul li img"), {
        max: 50,
        speed: 300,
        glare:true,
        "max-glare":0.4,
    });
    

    // 포트폴리오 탭메뉴
    let tabMenu = $('.tabMenu li'),
    tabSlider =$('.tabs > div')
    tabMenu.click(function(e){
        e.preventDefault()
        tabMenu.removeClass('active')
        $(this).addClass('active')
        tabSlider.hide();
        let target =$(this).find('a').attr("href")
        $(target).show();
        // moveSection(sectionIndex)
    })

    tabMenu.eq(0).trigger('click')


    //포트폴리오 모달
    $('.imgWrap').click(function(e){
        e.preventDefault()
        $('.modal').addClass("show")
        $('.modal').append(`
            <div class="item_box">
            <iframe src="https://www.youtube.com/embed/${$(this).data("video")}?rel=0&playinline=1&autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>    
        `)
    })
    $('.modal .dim').click(function(){
        $('.modal').removeClass("show")
        $('.modal .item_box').remove();
    })
 


    // $('.imgWrap img').mouseover(function(){
    //     $(this).attr("src",$(this).data("animated"))        
    // })
    // $('.imgWrap img').mouseout(function(){
    //     $(this).attr("src",$(this).data("static"))
    // })


    // 컨택트 모달
    const contactEmail = $('.contact_left > img')
    contactEmail.click(function(e){
        // e.stopPropagation();
        $('.contact-modal').fadeIn(500)
        $('.contact-modal-mask').show()
    })

    $('.contact-modal-mask').click(function(){
        $('.contact-modal').fadeOut(500)
        $('.contact-modal-mask').hide()
        $('.reset').trigger("click")
    })


    // 탑버튼(퀵메뉴)
    const goTop = $('#quick')
    // goTop.click(function(){
    //     $('html, body').animate({
    //         scrollTop: 0
    //     },500);
    // })

    // 스크롤 
    $(window).scroll(function(){
        let scrollPos = $(window).scrollTop();
        // console.log(scrollPos)
        if(scrollPos > 1000 ){
            goTop.addClass('visible')
        }else{
            goTop.removeClass('visible')
        }
    })

    

})
