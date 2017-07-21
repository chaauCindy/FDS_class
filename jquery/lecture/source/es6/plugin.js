;(function(global, $){
    'use strict';
    // Card component using jQuery library 
    function Card(q){
        if(!this){ throw 'new Card()로 사용해주세요.'; }
        this._$card = $(q);
        this.init();
    }

    function bind(card){
        card._$toggle.on('click', onClickToggle.bind(card._$toggle, card));
        card._$save.on('click', onClickSave.bind(card._$save, card));
        card._$edit.on('click', onClickEdit.bind(card._$edit, card));
        card._$delete.on('click', onClickDelete.bind(card._$delete, card));
    }
    function onClickToggle(card, e){
        e.preventDefault();
        card.toggle();
    }
    function onClickSave(card, e){
        e.preventDefault();
        card.save();
    }
    function onClickEdit(card, e){
        e.preventDefault();
        card.edit();
    }
    function onClickDelete(card, e){
        e.preventDefault();
        card.delete();
    }

    function isOpenedContent(){
        return this._$toggle.attr('aria-label').includes('close');
    }
    function openContent(){
        let aria_text = this._$toggle.attr('aria-label').replace('open','close');
        this._$toggle.attr('aria-label', aria_text).find('i').addClass('fa-angle-down').removeClass('fa-angle-up');
        this._$card.find('.card-content').slideDown(100);
    }
    function closeContent(){
        let aria_text = this._$toggle.attr('aria-label').replace('close','open');
        this._$toggle.attr('aria-label', aria_text).find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
        this._$card.find('.card-content').slideUp(100);
        
    }
    function toggleContent(){
        isOpenedContent.call(this) ? closeContent.call(this) : openContent.call(this);
    }
    function editCard(){
        this._$card.find('.content *:not(br)').attr('contenteditable', true).eq(0).focus();
    }
    function saveCard(){
        this._$card.find('.content *:not(br)').removeAttr('contenteditable');
        // validate & Ajax data transfer
    }
    function deleteCard(){
        this._$card.remove();
    }

    Card.fn = Card.prototype = {
        constructor: Card,
        init: function(){
            this._$toggle = this._$card.find('.card-toggle-btn');
            this._$save   = this._$card.find('.card-save-btn');
            this._$edit   = this._$card.find('.card-edit-btn');
            this._$delete = this._$card.find('.card-delete-btn');
            bind(this); //card{}
        },
        toggle:      toggleContent,
        edit:        editCard,
        save:        saveCard,
        delete:      deleteCard
    };

    $.Card = Card;
    
})(window, window.jQuery);
;(function(global, $){
    'use strict';
    var t_card = new $.Card('.twitter-card');
    var f_card = new $.Card('.facebook-card');
    t_card.toggle();
    f_card.toggle();
    
})(window, window.jQuery);
;(function(global, $){
    'use strict';
    
    $('.demo-radio').find('[role="tab"]').on('click',function(){
        $(this).parent().radioClass('is-active');
    });

})(window, window.jQuery);