
;(function(global, $){
    'use strict';

    // ―――――――――――――――――――――――――――――――――
    // class를 사용한 컨트롤 객체 생성
    // ―――――――――――――――――――――――――――――――――
    class Notification{
        constructor(selector){
            if($.type(selector)!=='string'){ throw '선택자를 문자로 전달해주세요.'; }
            if(selector.trim() === ''){ throw '선택자를 문자로 전달해주세요.'; }
            if(!this){ throw 'new Notification으로 생성해주세요.'; }
            this.$el = $(selector);
            this.bind();
        }
        bind(){
            this.$el.each((i,el) => { // Arrow function의 this는 상위 scope의 this를 지칭한다
                let $el = this.$el.eq(i);
                // let $el = $(el);
                $el.find('.delete').on('click', this.close.bind($el));
            });
        }
        close(){
            this.remove();
        }
    }

    global.Notification = Notification;
})(window, window.jQuery);
;(function(global, $, Notification){
    'use strict';
    let noti = new Notification('.site-noti');
    
    // ―――――――――――――――――――――――――――――――――
    // 이벤트 함수 바인딩 
    // ―――――――――――――――――――――――――――――――――
    // $('.notification .delete').on('click', function(){
    //     $(this).parent().remove();
    // });

})(window, window.jQuery, window.Notification);

;(function(global, $){
    'use strict';
    class Modal{
        constructor(query){
            this.$wrap = $(query);
            this.$el = $('.modal', this.$wrap);
            this.$show = $('.show-modal', this.$wrap);
            this.bind();
        }
        bind(){
            this.$el.each(i=>{
                this.$el.eq(i).on('click', this.close.bind(this.$el.eq(i)));
            });
            this.$show.each(i=>{
                this.$show.eq(i).on('click', this.open.bind(this.$el.eq(i)));
            });
        }
        close(e){
            let $target = $(e.target);
            ($target.is('.delete') || 
            //  $target.filter('button:contains("Cancel")').length ||
             $target.is('.is-cancel') ||
             $target.is('.modal-background'))
            && this.removeClass('is-active');
        }
        open(){
            this.addClass('is-active');
        }
    }
    global.Modal = Modal;

})(window, window.jQuery);
;(function(global,$,Modal){
    'use strict';
    let modal = new Modal('.modal-wrap');
    
})(window, window.jQuery, window.Modal);
;(function(global, $){
    'use strict';
    function Modal(el){
        this.$el = $(el);
        this.$el.find('.is-cancel, .delete, .modal-background').on('click', this.close.bind(this));
        // return this;
    }
    Modal.prototype.open = function(){
        this.$el.addClass('is-active');
    };
    Modal.prototype.close = function(){
        this.$el.removeClass('is-active');
    };

    $.Modal = Modal;

})//(window, window.jQuery);
;(function(global, $){
    'use strict';
    let $fds_modal = $('.fds-modal');
    $fds_modal.each(function(index, el){
        $.data(el, '$modal', new $.Modal(el));
        console.log(index, $.data(el, '$modal'));
    });
    let $btn_show = $('.show-modal');
    $btn_show.each(i=>{
        // console.log($fds_modal.eq(i));
        console.log($.data($fds_modal.eq(i)[0], '$modal'));
        $btn_show.eq(i).on('click', $.data($fds_modal.eq(i)[0], '$modal').open );
    })
})//(window, window.jQuery);
;(function(global,$){
    'use strict';

    let original_data, filtered_data;
    let limit_cnt = 10;
    let api_id = `f0etn`;
    let api_address = `https://api.myjson.com/bins/${api_id}`;

    function limitTo(data, n){
        return data.slice(0,n);
    }

    $.get(api_address).then(data=>{
        original_data = data;
        filtered_data = limitTo(data, limit_cnt);
        render();
    });
    
    function render(){
        let media_template = '';
        filtered_data.forEach(item=>{
            let image = item.image;
            let name = `${item.firstName} ${item.lastName}`;
            let id = item.id;
            let bio = item.bio;
            media_template += `<article class="media box">
                <figure class="media-left">
                    <p class="image is-64x64">
                    <img src="${image}" alt="picture of ${name}">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                    <p>
                        <strong>${name}</strong> <small>@${id}</small>
                        <br>
                        ${bio}
                    </p>
                    </div>
                </div>
                <div class="media-right">
                    <button type="button" aria-label="remove media object" class="delete"></button>
                </div>
            </article>`;
        });
        // $(media_template).appendTo($('.media-object-container'));
        let $media_group = $('.media-object-container').html(media_template);
        bindEvents($media_group);
    }

    function bindEvents($container){
        let $del_btns = $container.find('.delete');
        $del_btns.on('click',media_delete);
    }
    function media_delete(){
        let $del_el = $(this).parents('article');
        $del_el.css('position','relative').animate({
            'opacity': 'toggle',
            // 'right' : '-800px',
            'height': 'toggle',
            x: 800
        },{
            step: function(now, fx){
                $del_el.css('transform','translateX('+now+'px');
            }
        }, function(){
            $del_el.remove();
        });
    }
})(window, window.jQuery);