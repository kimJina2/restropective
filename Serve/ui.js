$(function () {
    // 참조코드 숨김처리
    $('.refCode').off().on('click', function(e){
        e.preventDefault();
        var text = $(this).text();
        $('.refCode').text(text == "참조정보 숨김" ? "참조정보 보기" : "참조정보 숨김");
        $('.referenceCode').toggleClass('none');
    });

    // 결제정보 아코디언
    $('.referrer button').on('click', function(){
        $(this).toggleClass('active');
    });

    //ie 적용할 때 말줄임 이슈 처리(예비)
    $(".pkgTXt").each(function(e){
        var txt = $(this).text();
        var txtLen = txt.length;
        if(txtLen > 60){
            $(this).text($(this).text().substr(0,38)+'...');
        }
    });

    //tab 이벤트 처리
    var tabs = $('.tabMenu a');
    tabs.on('click', function(){
        var idx = $(this).parent().index();
        $('.tabCont').eq(idx).addClass('active').siblings().removeClass('active');
    });
    $('.tabCont').eq(0).addClass('active');

    //쿠폰선택(체크박스)
    $('.couponOut input[name="chk101"]').change(function() {
        $('.couponOut input[name="chk101"]').each(function() {
            var checked = $(this).prop('checked'),
                couponBox = $(this).parent().next();
            checked ? couponBox.addClass('active') : couponBox.removeClass('active');
        });
    });
})