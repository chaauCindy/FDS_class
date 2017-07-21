'use strict';

;(function (global, $) {
    'use strict';

    if (!$.fn.swipe) {
        $.fn.swipe = function (callback) {
            var $this = this;
            // var supportsTouch = 'touch...??' in global;

            return $.each($this, function (i, el) {
                var $el = $this.eq(i);
                var touch, startX, startY, moveX, moveY, distanceX, distanceY;
                var direction, directionX, directionY;
                function computedTouch(e) {
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
                    touchstart: function touchstart(e) {
                        e.preventDefault();
                        touch = e.changedTouches[0];
                        startX = global.parseInt(touch.clientX, 10);
                        startY = global.parseInt(touch.clientY, 10);
                        callback.call($el, {
                            type: 'start',
                            touch: touch, startX: startX, startY: startY
                        }, e);
                    },
                    touchmove: function touchmove(e) {
                        e.preventDefault();
                        computedTouch(e);
                        callback.call($el, {
                            type: 'move',
                            touch: touch, direction: direction
                        }, e);
                    },
                    touchend: function touchend(e) {
                        e.preventDefault();
                        computedTouch(e);
                        callback.call($el, {
                            type: 'end',
                            touch: touch, direction: direction
                        }, e);
                    }
                });
                // desktop Mouse Event
            });
        };
    }
})(window, window.jQuery);