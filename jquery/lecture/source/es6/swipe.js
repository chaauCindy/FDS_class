;(function(global,$){
    'use strict';
    
    if(!$.fn.swipe){
        $.fn.swipe = function(callback){
            var $this = this;
            // var supportsTouch = 'touch...??' in global;
            
            return $.each($this, function(i, el){
                var $el = $this.eq(i);
                var touch, startX, startY, moveX, moveY, distanceX, distanceY;
                var direction, directionX, directionY;
                function computedTouch(e){
                    touch = e.changedTouches[0];
                    moveX = global.parseInt(touch.clientX, 10);
                    moveY = global.parseInt(touch.clientY, 10);
                    distanceX = global.parseInt(startX - moveX), 10;
                    distanceY = global.parseInt(startY - moveY), 10;
                    directionX = distanceX < 0 ? 'right' : 'left';
                    directionY = distanceY < 0 ? 'down' : 'up';
                    direction = directionX + ' ' + directionY;
                }
                // mobile Touch Event
                $el.on({
                    touchstart : function(e){
                        e.preventDefault();
                        touch = e.changedTouches[0];
                        startX = global.parseInt(touch.clientX, 10);
                        startY = global.parseInt(touch.clientY, 10);
                        callback.call($el, {
                            type: 'start',
                            touch, startX, startY
                        }, e);
                    },
                    touchmove : function(e){
                        e.preventDefault();
                        computedTouch(e);
                        callback.call($el, {
                            type: 'move',
                            touch, direction
                        }, e);
                    },
                    touchend : function(e){
                        e.preventDefault();
                        computedTouch(e);
                        callback.call($el, {
                            type: 'end',
                            touch, direction
                        }, e);
                    },
                });
                // desktop Mouse Event
            });
        }
    }
})(window, window.jQuery);