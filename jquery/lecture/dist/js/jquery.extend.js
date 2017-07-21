;(function($){
    'use strict';
    if (!$.random){
        $.random = seed => Math.floor(Math.random() * seed);
    }
    if(!$.cache){
        $.cache = el=>$.data(el,'$') || $.data(el,'$', $(el));
    }
    if ( !$.shake ) {
        $.shake = ($el, time=2000, shake=10, distance=5) => {
        let duration = time/shake/4;
        $el.css('position', 'relative');
        $.when(
            $el
            .stop()
            .animate({left: -distance}, duration)
            .animate({left: distance}, duration)
            .animate({left: 0}, duration)
        ).done(()=>$el.removeAttr('style'));
        }
    }
})(window.jQuery);


;(function($){
    'use strict';

    // radioClass
    if(!$.fn.radioClass){
        $.fn.radioClass = function(name='active'){
            // this === jQUery{}
            this.addClass(name).siblings(`.${name}`).removeClass(name);
            return this;
        }
    }
    // swipe {type, direction, x, y}
})(window.jQuery);