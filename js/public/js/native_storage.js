/**
 * -----------------------
 * DOM 스토리지(DOMStorage
 * -----------------------
 * 1. localStorage
 * 2. sessionStorage
 * 3. JSON.parse()
 * 4. JSON.stringify()
 */

(function(global, $){
    'use strict';
    var document     = global.document;
    var forEach      = Array.prototype.forEach;
    var loaded_data, memo, memo_buttons, memo_title, memo_content;
    var root, app, memo_items;

    function init(){
        root         = '/memo/';
        app          = document.querySelector('.app');
        memo         = document.querySelector('.memo');
        memo_buttons = memo.querySelectorAll('button');
        memo_items   = app.querySelector('.memo-item-container');
        load();
        bind();
    }
    function load(){
        $.get(root, function(data, status, xhr){
            if (status === 'success') {
                loaded_data = data;
            } else {
                loaded_data = [];
            }
            render();
        });
    }
    function render(){
        var template = '';
        memo_items.innerHTML = '';
        loaded_data.forEach(function(memo){
            template += '<article class="memo-item column is-3 message is-primary">'+
                '<div class="message-header">'+
                    '<h5 class="memo-item-title">' + memo.title + '</h5>'+
                    '<a class="is-inverted is-outlined modify" data-index="' + memo.id + '" aria-label="메모 아이템 수정"><span class="icon is-small"><i class="fa fa-pencil" aria-hidden="true"></i></span></a>'+
                    '<button type="button" class="delete" data-index="' + memo.id + '" aria-label="메모 아이템 제거"></button>'+
                '</div>'+
                '<div class="message-body">'+
                    '<p class="memo-item-content">' + memo.content + '</p>'+
                '</div>'+
            '</article>';
        });
        memo_items.innerHTML = template;
    }
    function bind(){
        forEach.call(memo_buttons, function(button){
            button.addEventListener('click', detectComponents);
        });
        memo_items.addEventListener('click', remove);
    }
    function detectComponents(){
        this.classList.contains('is-save') ? save() : cancel();
    }
    function remove(e){
        var target = e.target;
        if (target.localName === 'button' && target.classList.contains('delete')){
            $.ajax({ 
                method: 'DELETE',
                url: root+target.dataset.index,
                dataType: 'json',
                success: function(data, status){
                    console.log('삭제 성공');
                    load();
                }
            });
            e.stopPropagation(); //이벤트 전파 중지
        }
    }
    function validateMemo(title, content){
        if (title.value.trim() === '' ){
            global.alert('메모 제목을 입력한 후, 저장 버튼을 눌러주세요.');
            title.focus();
            return true;
        } 
        if (content.value.trim() === ''){
            global.alert('메모 내용을 입력한 후, 저장 버튼을 눌러주세요.');
            content.focus();
            return true;
        }
    }
    function save(){
        memo_title   = memo.querySelector('#memo-title');
        memo_content = memo.querySelector('#memo-content');

        if (validateMemo(memo_title, memo_content)) { return; }

        var memo_item = {
            title : memo_title.value,
            content: memo_content.value
        };
        storage(memo_item);
    }
    function storage(new_item){
        $.post(root, $.param(new_item), function(data, status){
            if(status ==='success'){
                console.log ('입력 성공');
                load();
            }
        });
        cancel();
    }
    function cancel(){        
        memo.querySelector('#memo-title').value ='';
        memo.querySelector('#memo-content').value ='';
    }
    init();
})(window, window.jQuery);