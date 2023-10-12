(function(t) {
    var ui = {
        init: function() {
            ui.tooltip();
        },
        // 툴팁 리팩토링 전
        tooltip: function(){
            for (var i = 0; i < $('.tooltipWrap').length; i++){
                $('.tooltipWrap').eq(i).find('.icoBtn_tip').attr('aria-labelledby', 'tooltip_0' + i);
                $('.tooltipWrap').eq(i).find('.tooltip').attr('id', 'tooltip_0' + i);
            };

            $(".tooltipWrap:not(.highlight) .icoBtn_tip, .tooltipWrap:not(.highlight) .btn_tip").bind("mouseover", function(e){
                //e.preventDefault();
                var tooltip = $(this).closest(".tooltipWrap");
                tooltip.addClass("on");
                tooltip.find(".tooltip").addClass("open");
                tooltip.find(".tooltip.open").attr("tabindex", -1);
                tooltip.css({"z-index":ui.zIndex++});
            });
            $(".tooltipWrap:not(.highlight)").bind("mouseleave", function(){
                var tooltip = $(this).closest(".tooltipWrap");
                tooltip.removeClass("on");
                tooltip.find(".tooltip").removeClass("open");
                tooltip.css({"z-index":""});
            });
            $(".tooltipWrap.highlight .icoBtn_tip, .tooltipWrap.highlight .btn_tip").bind("click", function(e){
                //e.preventDefault();
                var tooltip = $(this).closest(".tooltipWrap");
                tooltip.addClass("on");
                tooltip.find(".tooltip").addClass("open");
                tooltip.find(".tooltip.open").attr("tabindex", -1);
                tooltip.css({"z-index":ui.zIndex++});
            });
            $(".tooltipWrap.highlight .btn_close").bind("click", function(){
                var tooltip = $(this).closest(".tooltipWrap");
                tooltip.removeClass("on");
                tooltip.find(".tooltip").removeClass("open");
                tooltip.css({"z-index":""});
            });
        },
        // 툴팁 리팩토링 후
        tooltip: function(){
            var i               = 0,
                $tooltip	    = $('.tooltipWrap'),
                $toolIs 		= $('.tooltipWrap.highlight');

            for (; i<$tooltip.length; i++){
                $('.tooltipWrap:eq('+i+')').each(function(){
                    $(this).children('.icoBtn_tip').attr('aria-labelledby', 'tooltip_0' +i)
                        .siblings('.tooltip').attr('id', 'tooltip_0' + i);
                    //.highlight가 있는 케이스일때
                    if($(this).is('.highlight')) {
                        $toolIs.find('.icoBtn_tip').off().on({ // 기존.btn_tip은 없어서 제거
                            'click' : function() {
                                $toolIs.addClass('on')
                                    .find('.tooltip').addClass('open')
                                    .find('.tooltip.open').attr("tabindex", -1).css({"z-index":ui.zIndex++});
                            }
                        })
                        $toolIs.find('.btn_close').off().on({
                            'click' : function() {
                                $toolIs.removeClass('on')
                                    .find('.tooltip').removeClass('open').css({"z-index":""});
                            }
                        })

                    } //.highlight가 없는 케이스일때
                    else {
                        $(this).find('.icoBtn_tip').off().on({ // 기존.btn_tip은 없어서 제거
                            'mouseenter' : function() {
                                $(this).parent('.tooltipWrap').addClass('on')
                                    .find('.tooltip').addClass('open')
                                    .find('.tooltip.open').attr('tabindex', -1).css({"z-index":ui.zIndex++});
                            }
                        })
                        $(this).off().on({
                            'mouseleave' : function() {
                                $(this).removeClass('on')
                                    .find('.tooltip').removeClass('open').css({"z-index":""});
                            }
                        })
                    }

                });
            };
        },
    }
    t.ui = ui;
})(this)