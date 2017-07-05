/**
 * -----------------------
 * DOM 스토리지(DOMStorage
 * -----------------------
 * 1. localStorage
 * 2. sessionStorage
 * 3. JSON.parse()
 * 4. JSON.stringify()
 */

(function(global){
    'use strict';
    
    var document     = global.document;
    var JSON         = global.JSON;
    var forEach      = Array.prototype.forEach;
    var myStorage    = global.localStorage;
    var memo_data_id = 'memo-data';
    var loaded_data, memo, memo_buttons, memo_title, memo_content;
    var app, memo_items;
    var frag, root_frag;

    function init(){
        app                 = document.querySelector('.app');
        memo                = document.querySelector('.memo');
        memo_buttons        = memo.querySelectorAll('button');
        memo_items          = app.querySelector('.memo-item-container');
        load(memo_data_id);
        render();
        bind();
    }
    function load(id){
        loaded_data = myStorage.getItem(id);
        loaded_data = loaded_data ? JSON.parse(loaded_data) : [];
    }
    function render(){
        var template = '';
        memo_items.innerHTML = '';
        loaded_data.forEach(function(memo, index){
            template += '<article class="memo-item column is-3 message is-primary">'+
                '<div class="message-header">'+
                    '<h5 class="memo-item-title">' + memo.title + '</h5>'+
                    '<button type="button" class="delete" data-index="'+index+'" aria-label="메모 아이템 제거"></button>'+
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
        memo_items.addEventListener('click', removeMemo);
    }
    function detectComponents(){
        this.classList.contains('is-save') ? saveMemo() : cancelMemo();
    }
    function removeMemo(e){
        var target = e.target;
        if (target.localName === 'button' && target.classList.contains('delete')){
            e.stopPropagation(); //이벤트 전파 중지
            var index = target.getAttribute('data-index');
            memo_items.removeChild(memo_items.querySelectorAll('.memo-item')[index]);
            loaded_data.splice(index, 1);
            storage();
            render();
        }
    }
    function validateMemo(title, content){
        if (title.value.trim() === '' ){
            global.alert('메모 제목을 입력한 후, 저장 버튼을 눌러주세요.');
            title.focus();
            return;
        } 
        if (content.value.trim() === ''){
            global.alert('메모 내용을 입력한 후, 저장 버튼을 눌러주세요.');
            content.focus();
            return;
        }
    }
    function saveMemo(){
        memo_title   = memo.querySelector('#memo-title');
        memo_content = memo.querySelector('#memo-content');

        if (validateMemo(memo_title, memo_content)) { return; }

        var memo_item = {
            title : memo_title.value,
            content: memo_content.value
        };
        loaded_data.push(memo_item);
        storage();
        cancelMemo();
        render();
    }
    function storage(){
        myStorage.setItem(memo_data_id, JSON.stringify(loaded_data));//데이터의 문자화
    }
    function cancelMemo(){        
        memo.querySelector('#memo-title').value ='';
        memo.querySelector('#memo-content').value ='';
    }
    init();
})(window);