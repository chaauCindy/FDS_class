'use strict';

// JSON:
// https://api.myjson.com/bins/f0etn

(function (global, $) {
    'use strict';

    var api_id = 'f0etn';
    var api_address = 'https://api.myjson.com/bins/' + api_id;

    $.holdReady(true);
    $.get(api_address).then(function (data) {
        console.log(data);
        $.holdReady(false);
    });
});(function (global, $) {
    'use strict';

    console.groupCollapsed('jQuery version');
    console.log($().jquery);
    console.log($.fn.jquery);
    console.log($.prototype.jquery);
    console.log(jQuery.prototype.jquery);
    console.groupEnd('jQuery version');
});(function (global, $) {
    'use strict';

    var _this = this;

    $('h1').css('color', 'tan').addClass('is-3').removeClass('is-1');
    console.groupCollapsed('jQuery 인스턴스 메서드 검증');
    console.log('jQuery.prototype.css : ', !!jQuery.prototype.css);
    console.log('jQuery.prototype.addClass : ', !!jQuery.prototype.addClass);
    console.log('jQuery.prototype.removeClass : ', !!jQuery.prototype.removeClass);
    console.log('jQuery.prototype.radioClass : ', !!jQuery.prototype.radioClass);
    console.groupEnd('jQuery 인스턴스 메서드 검증');

    //DOM Node 전달
    $(document).on('click', function (e) {
        console.log('e.target : ', e.target);
        console.log('e.currentTarget : ', e.currentTarget);
        console.log(_this); // Arrow function 내부의 this는? 상위 컨텍스트
    });

    var $global = $(global);
    var $main = $('.main');

    // $global.on('scroll', function() {
    //     $global.scrollTop() > 123 ? $main.addClass('is-fixed') : $main.removeClass('is-fixed');
    // });

    // function bind 
    $global.on('scroll', function () {
        this.scrollTop() > 123 ? $main.addClass('is-fixed') : $main.removeClass('is-fixed');
    }.bind($global));
});(function (global, $) {
    'use strict';

    // 요소노드

    var body = global.document.body;
    var $body = $(body);
    $body.css({
        fontSize: '32px',
        'margin-bottom': '+=40px',
        'background': 'url("//placehold.it/1920x900/000/fff") 0 0/ cover no-repeat '
    });

    // 노드리스트
    var $body_children = $(body.children);
    $body_children.attr('data-children-of-body', 'yes');

    // 배열
    $([document.documentElement, document.body]).each(function (index, el) {
        var $el = $(el);
        if (el.localName === 'html') {
            $el.data('is-root', 'yes');
        } else {
            $el.data('is-root', 'no');
        }
        console.log($el, 'is-root :', $el.data('is-root'));
    });
    // jQuery 객체
    // $($body)

    // html string
    var $dim = $('<div></div>', {
        'class': 'dim',
        'on': {
            'click': function click(e) {
                return $(e.target).remove();
            },
            'mouseenter': function mouseenter(e) {
                return $(e.target).css('background-color', 'rgba(122, 66, 122, 0.75)');
            },
            'mouseleave': function mouseleave(e) {
                return $(e.target).css('background-color', $dim.data('original-dim-bg'));
            }
        }
    }).prependTo($body);
    $dim.data('original-dim-bg', $dim.css('background-color'));

    // 함수

});(function (global, $) {
    'use strict';

    var $box = $('.box');

    var toggleBox = function toggleBox() {
        $box.hasClass('hide') ? $box.removeClass('hide') : $box.addClass('hide');
    };
    $('.toggle-box').on('click', toggleBox);

    // addClass(function(index, currentClassName){})
    $('.app').addClass(function (index, name) {
        var names = name.split(' ');
        var convert_names = names.map(function (name) {
            return '*-' + name + '-*';
        });
        convert_names = convert_names.join(' ');
        return convert_names;
    }).find('*').addClass(function (index) {
        return 'child-' + index;
    });

    var toggleSubMenu = function toggleSubMenu(e) {
        e.preventDefault();
        var $this = $(this);
        var $list = $this.next();
        var $siblings = $this.parent().siblings();
        var time = 300;

        if ($list.is(':visible')) {
            $list.hide(time);
            $this.removeClass('is-active');
        } else {
            $this.addClass('is-active');
            $list.show(time);
            $siblings.find('> a').removeClass('is-active');
            $siblings.find('ul').hide(time);
        }
    };
    $('.sub-menu').hide();
    $('.main-menu > li > a').on('click', toggleSubMenu);
});(function ($) {
    'use strict';

    if (!$.random) {
        $.random = function (seed) {
            return Math.floor(Math.random() * seed);
        };
    }
    if (!$.cache) {
        $.cache = function (el) {
            return $.data(el, '$') || $.data(el, '$', $(el));
        };
    }
    if (!$.shake) {
        $.shake = function ($el) {
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
            var shake = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
            var distance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;

            var duration = time / shake / 4;
            $el.css('position', 'relative');
            $.when($el.stop().animate({ left: -distance }, duration).animate({ left: distance }, duration).animate({ left: 0 }, duration)).done(function () {
                return $el.removeAttr('style');
            });
        };
    }
})(window.jQuery);
;(function (global, $) {
    'use strict';

    var $component = void 0,
        $lists = void 0,
        $labels = void 0,
        usingToggleList = void 0,
        time = 300,
        is_multi_toggle = false;

    function init() {
        $component = $('.ui-accordion');
        $lists = $component.find('.menu-list');
        $labels = $('.menu-label a', $component);
        usingToggleList = is_multi_toggle ? toggleMultiList : toggleSingleList;
        // 이벤트 바인딩
        bind();
        // 초기 실행
        // $lists.filter((index,el)=>{
        //     return index > 0;
        // }).hide();
        $lists.hide();
        // $labels.eq($.random($labels.length)).trigger('click');
    }

    function bind() {
        $labels.on('click', usingToggleList);
    }

    function toggleList($el) {
        var $list = $el.parent().next();
        $list.toggle(time);
        $el.toggleClass('is-active');
    }

    function toggleMultiList(e) {
        e.preventDefault();
        toggleList($.cache(e.target));
    }

    function toggleSingleList(e) {
        e.preventDefault();
        var $this = $.cache(e.target);
        var $actived = $labels.filter('.is-active');
        if ($actived.is($this)) {
            // 흔들기
            $.shake($this.parent());
            return;
        }
        $actived.length && toggleList($actived);
        toggleList($this);
    }
    init();
})(window, window.jQuery);