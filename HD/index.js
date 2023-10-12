$(function() {
    // 반응형: 기존1개 팝업을 2개로 추가
    // 수정 전(1개)
    function mainPopClose(obj){
        var $obj = $(obj);
        $obj.closest('.layer-wrap.main').hide();
    }

    // 수정 후 (2개)
    var obj = window.matchMedia("screen and (min-width:300px) and (max-width:1025px)");
    var layerEvn = $("#layerPop").children('.layer.two');
    function eventPop() {
        $(".layer-close").on("click", function(e){
            layerEvn.hide();
            $("#layerPop").remove();
        });
    }
    function popDel() {
        if($("#layerPop").children().length == 0) {
            $("#layerPop").remove();
        }
        if(obj.matches) {
            layerEvn.show();
            eventPop();
        }
    }
    $(".layer-close").on("click", function(e){
        e.preventDefault();
        $(this).closest(".layer").remove();
        popDel();
    });
    popDel();
})
