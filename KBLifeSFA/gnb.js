(function(t) {
    var ui = function() {

    }
    t.ui = ui;
})(this)
//리팩토링 전 코드
const gnbInit = function(){
    const tabs = document.querySelectorAll('.gnb_tab');
    const subs = document.querySelectorAll('.gnb_tab_sub');
    const depths2 = document.querySelectorAll('.gnb_depth2 > li');
    const depths3 = document.querySelectorAll('.gnb_depth3');

    // GNB
    for (const tab of Array.from(tabs)) {
        tab.addEventListener("mouseenter", mEnter, false);
        tab.addEventListener("click", mEnter, false);
    }
    for (const sub of Array.from(subs)) {
        sub.addEventListener("mouseleave", mLeave, false);
    }
    for (const depth2 of Array.from(depths2)) {
        depth2.addEventListener("mouseenter", mEnter2, false);
        depth2.addEventListener("mouseleave", mLeave2, false);
    }

    if (depths3) {
        depths3.forEach(e => {
            e.parentNode.classList.add('hasDepth');
        });

    }

    function mEnter(e) {
        e.preventDefault();
        tabs.forEach(e => {
            e.classList.remove('active');
        });
        subs.forEach(e => {
            e.classList.remove('active');
        });
        this.classList.add('active');
        this.nextElementSibling.classList.add('active');
    }
    function mEnter2(e) {
        e.preventDefault();
        depths2.forEach(e => {
            e.classList.remove('active');
        });
        this.classList.add('active');
    }

    function mLeave(e) {
        e.preventDefault();
        tabs.forEach(e => {
            e.classList.remove('active');
        });
        subs.forEach(e => {
            e.classList.remove('active');
        });
    }

    function mLeave2(e) {
        e.preventDefault();
        depths2.forEach(e => {
            e.classList.remove('active');
        });
    }
}
$(document).ready(function(){
     gnbInit(); // 페이지 상단 GNB 관련 JS
});

//리팩토링 후 코드(기존 자바스크립트코드 변경)
(function(t) {
    var ui = function() {
        gnb.init();
    }
    var gnb = {
        init : function(){
            var $gnbIs = $('.gnb > li'),
                $depths2 = $('.gnb_depth2 > li');

            $gnbIs.each(function(){
                $(this).find('> .gnb_tab').on({
                    'mouseover focusin' : function(){ //mouseover focusin
                        if(!$(this).hasClass('active')) {
                            $(this).addClass('active').siblings().addClass('active')
                        }
                    },
                    'mouseout focusout' : function() { //mouseout focusout
                        $(this).removeClass('active')
                        if($(this).removeClass('active') >= 1) {
                            $(this).siblings().hide()
                        }
                    },
                });
                $(this).find('.gnb_tab_sub').on({
                    'mouseout focusout' : function(){
                        $(this).find('.gnb_tab').removeClass('active')
                    },
                });
            });
            $depths2.each(function(){
                if($(this).children().hasClass('gnb_depth3')) {
                    $depths2.addClass('hasDepth')
                }
                $(this).on({
                    'mouseover focusin' : function(){
                        if($(this).hasClass('hasDepth')) {
                            $(this).addClass('active')
                        }
                    },
                    'mouseout focusout' : function(){
                        $(this).removeClass('active')
                    }
                });
            });
        }
    }
    t.ui = ui;
    t.gnb = gnb;
})(this)