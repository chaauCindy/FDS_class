'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function (global, $) {
    'use strict';

    // ―――――――――――――――――――――――――――――――――
    // class를 사용한 컨트롤 객체 생성
    // ―――――――――――――――――――――――――――――――――

    var Notification = function () {
        function Notification(selector) {
            _classCallCheck(this, Notification);

            if ($.type(selector) !== 'string') {
                throw '선택자를 문자로 전달해주세요.';
            }
            if (selector.trim() === '') {
                throw '선택자를 문자로 전달해주세요.';
            }
            if (!this) {
                throw 'new Notification으로 생성해주세요.';
            }
            this.$el = $(selector);
            this.bind();
        }

        _createClass(Notification, [{
            key: 'bind',
            value: function bind() {
                var _this = this;

                this.$el.each(function (i, el) {
                    // Arrow function의 this는 상위 scope의 this를 지칭한다
                    var $el = _this.$el.eq(i);
                    // let $el = $(el);
                    $el.find('.delete').on('click', _this.close.bind($el));
                });
            }
        }, {
            key: 'close',
            value: function close() {
                this.remove();
            }
        }]);

        return Notification;
    }();

    global.Notification = Notification;
})(window, window.jQuery);
;(function (global, $, Notification) {
    'use strict';

    var noti = new Notification('.site-noti');

    // ―――――――――――――――――――――――――――――――――
    // 이벤트 함수 바인딩 
    // ―――――――――――――――――――――――――――――――――
    // $('.notification .delete').on('click', function(){
    //     $(this).parent().remove();
    // });
})(window, window.jQuery, window.Notification);

;(function (global, $) {
    'use strict';

    var Modal = function () {
        function Modal(query) {
            _classCallCheck(this, Modal);

            this.$wrap = $(query);
            this.$el = $('.modal', this.$wrap);
            this.$show = $('.show-modal', this.$wrap);
            this.bind();
        }

        _createClass(Modal, [{
            key: 'bind',
            value: function bind() {
                var _this2 = this;

                this.$el.each(function (i) {
                    _this2.$el.eq(i).on('click', _this2.close.bind(_this2.$el.eq(i)));
                });
                this.$show.each(function (i) {
                    _this2.$show.eq(i).on('click', _this2.open.bind(_this2.$el.eq(i)));
                });
            }
        }, {
            key: 'close',
            value: function close(e) {
                var $target = $(e.target);
                ($target.is('.delete') ||
                //  $target.filter('button:contains("Cancel")').length ||
                $target.is('.is-cancel') || $target.is('.modal-background')) && this.removeClass('is-active');
            }
        }, {
            key: 'open',
            value: function open() {
                this.addClass('is-active');
            }
        }]);

        return Modal;
    }();

    global.Modal = Modal;
});(function (global, $, Modal) {
    'use strict';

    var modal = new Modal('.modal-wrap');
});(function (global, $) {
    'use strict';

    function Modal(el) {
        this.$el = $(el);
        this.$el.find('.is-cancel, .delete, .modal-background').on('click', this.close.bind(this));
        // return this;
    }
    Modal.prototype.open = function () {
        this.$el.addClass('is-active');
    };
    Modal.prototype.close = function () {
        this.$el.removeClass('is-active');
    };

    $.Modal = Modal;
});(function (global, $) {
    'use strict';

    var $fds_modal = $('.fds-modal');
    $fds_modal.each(function (index, el) {
        $.data(el, '$modal', new $.Modal(el));
        console.log(index, $.data(el, '$modal'));
    });
    var $btn_show = $('.show-modal');
    $btn_show.each(function (i) {
        // console.log($fds_modal.eq(i));
        console.log($.data($fds_modal.eq(i)[0], '$modal'));
        $btn_show.eq(i).on('click', $.data($fds_modal.eq(i)[0], '$modal').open);
    });
});(function (global, $) {
    'use strict';

    var original_data = void 0,
        filtered_data = void 0;
    var limit_cnt = 10;
    var api_id = 'f0etn';
    var api_address = 'https://api.myjson.com/bins/' + api_id;

    function limitTo(data, n) {
        return data.slice(0, n);
    }

    $.get(api_address).then(function (data) {
        original_data = data;
        filtered_data = limitTo(data, limit_cnt);
        render();
    });

    function render() {
        var media_template = '';
        filtered_data.forEach(function (item) {
            var image = item.image;
            var name = item.firstName + ' ' + item.lastName;
            var id = item.id;
            var bio = item.bio;
            media_template += '<article class="media box">\n                <figure class="media-left">\n                    <p class="image is-64x64">\n                    <img src="' + image + '" alt="picture of ' + name + '">\n                    </p>\n                </figure>\n                <div class="media-content">\n                    <div class="content">\n                    <p>\n                        <strong>' + name + '</strong> <small>@' + id + '</small>\n                        <br>\n                        ' + bio + '\n                    </p>\n                    </div>\n                </div>\n                <div class="media-right">\n                    <button type="button" aria-label="remove media object" class="delete"></button>\n                </div>\n            </article>';
        });
        // $(media_template).appendTo($('.media-object-container'));
        var $media_group = $('.media-object-container').html(media_template);
        bindEvents($media_group);
    }

    function bindEvents($container) {
        var $del_btns = $container.find('.delete');
        $del_btns.on('click', media_delete);
    }
    function media_delete() {
        var $del_el = $(this).parents('article');
        $del_el.css('position', 'relative').animate({
            'opacity': 'toggle',
            // 'right' : '-800px',
            'height': 'toggle',
            x: 800
        }, {
            step: function step(now, fx) {
                $del_el.css('transform', 'translateX(' + now + 'px');
            }
        }, function () {
            $del_el.remove();
        });
    }
})(window, window.jQuery);