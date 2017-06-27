(function(global, document, $){
    'use strict';
    
    // 1. 부모요소를 기준으로 자식 요소를 선택
        function methodOne(){
            var wrapper = $.selector('.wrapper');
            var new_node = $.createEl('h1','InsertBefore');
            new_node.setAttribute('lang','en');
            new_node.setAttribute('class','wrapper-headline');
            // // console.log('new_node : ', new_node);

            //부모노드.insertBefore(new_node, 부모노드로 찾은 자식노드)
            wrapper.onmouseover = function(){
                this.insertBefore(new_node, $.selector('p',this));
                // 이벤트 제거
                this.onmouseover = null;
            };
        }

    // 2. 자식요소를 기준으로 부모 요소에 노드 추가
        function methodTwo() {
            var wrapper_p = $.selector('.wrapper p');
            var target  = $.selector('.wrapper .target');
            var new_node = $.createEl('h1','prependChild');
            new_node.setAttribute('lang','en');
            new_node.setAttribute('class','wrapper-headline');
            // 객체에 inline style onclick event 사용하기 위한 전역 함수 생성
            // 이벤트 실행 객체(this)를 전달받아 함수 내부에서 사용
            global.changePosition = function(_this){
                // 한번 바꾸고 button 비활성화, 이벤트 제거
                // $.insertBefore(target, wrapper_p);
                // $.insertAfter(wrapper_p,target);
                // _this.setAttribute('disabled','disabled');
                // _this.onclick = null;
                $.prepend($.selector('.tester'), new_node);
                // 계속 바꿔!!
                // $.parent(wrapper_p).insertBefore($.next($.next(_this)),$.next(_this));
            };
        }
        //methodTwo();

    function removeChildDemo(){
        global.setTimeout(afterTimeRemove, 2200);
    }
    //removeChildDemo();
    function afterTimeRemove(){
        var removed_el = $.selector('.target');
        removed_el = $.removeChild(removed_el);
        // global.setTimeout(afterTimeAndAttach(removed_el), 3000);
        global.setTimeout(afterTimeAndAttach.bind(removed_el),3000);
        // global.setTimeout(afterTimeAndAttach.apply(removed_el),3000);
    }
    function afterTimeAndAttach(){
        // removed_el 함수내의 this로 bind
        $.insertAfter(this, $.selector('.tester'));
    }

    global.setActiveItem = function(_this){
        $.radioClass(_this,'active');
    }

    function innerHTMLDemo(data){
        var list_content = data;
        var list_html = '<ul class="list">';
        for(var i=0, l=list_content.length; i < l; ++i){
            list_html += '<li tabindex=0 onclick="setActiveItem(this);" class="list-item">' + list_content[i] + '</li>';
        }
        list_html += '</ul>';
        $.HTML($.selector('.mount'), list_html);
    }
    function replaceChildDemo(){
        innerHTMLDemo('아메리카노 카페라떼 차이티라떼 카페모카 카푸치노'.split(' '));
        bindEvents();
    }
    function bindEvents(){
        var wrapper = $.selector('.input-field');
        var btn_replace = $.selector('.is-replace-role',wrapper);
        btn_replace.onclick = replaceListItem.bind(this, wrapper);   
    }
    function replaceListItem(wrapper){ 
        var active_item = $.selector('.list-item.active');
        var input = $.selector('input',wrapper);
        var new_value = $.selector('#replace-content').value;
        if (!new_value.trim()) {
            global.alert('대체 콘텐츠를 입력해주세요~');
            return false;
        }
        if (active_item){
            var new_item = $.newEl('li', new_value);
            new_item.setAttribute('class','list-item');
            new_item.setAttribute('tabindex',0);
            new_item.setAttribute('onclick','setActiveItem(this)');
            $.replaceChild(new_item, active_item);
            $.selector('#replace-content').value = '';
        } else {
            alert('대체할 대상을 선택하세요!');
        }
    }

    replaceChildDemo();
})//(window, window.document, window.FDS);
;

(function(global, $, emmet){
    'use strict';
    var gnb = $.selector('#gnb');
    var copyzone =$.selector('.copyzone');
    emmet.require('textarea').setup({
        pretty_break: true,
        use_tab: true
    });
    // gnb 내부 a요소에 이벤트 바인딩
    var gnb_links = $.selectorAll('a', gnb);
    // Array.prototype.forEach > ES5(2009) IE9+
    // es5shim.js > IE9 하위버전에서도 ES5를 사용할 수 있게함
    var forEach = Array.prototype.forEach;
    forEach.call(gnb_links, function(link){
        // link.onclick = function(event){
        //     event = event || window.event;
        link.onclick = function(e){
            e.preventDefault();
            console.log(this);
        }
    });

    global.cloneNodeGNB = function (){    
        // cloneNode 노드 복제 >> 바인드된 이벤트는 복제되지 않음
        // var copied_gnb = gnb.cloneNode(true);
        var copied_gnb = $.clone(gnb, true);
        $.appendChild(copied_gnb, copyzone);
        // 이벤트까지 복제하려면
        // copyEvent( $.selectorAll('a', copied_gnb), gnb_links );
    }
    
    // event 복제를 위한 순환처리
    // function copyEvent( copied, copy ){
    //     forEach.call(copied, function(item, index){
    //         item.onclick = copy[index].onclick;
    //     });
    // }
    var textarea = $.selector('#user-html-code'); 
    textarea.onkeyup = function(e){
        var key = e.keyCode || e.which;
        (key === 13) && render();
    };
    $.selector('.is-change-html-code').onclick = render;
    function render(){
        $.HTML($.selector('div.html-wrapper'), textarea.value);
    };


    // insertAdjacentHTML(position, html code)
    // cross browsing
    var target = $.selector('.insert-adjacent-html .target');
    // target.insertAdjacentHTML('beforebegin','<h2 class="beforebegin">beforebegin</h2>');
    target.insertAdjacentHTML('afterbegin','<strong class="afterbegin">afterbegin</strong>');
    target.insertAdjacentHTML('beforeend','<strong class="beforeend">beforeend</strong>');
    // target.insertAdjacentHTML('afterend','<h2 class="afterend">afterend</h2>');

    // insertAdjacentElement()
    target.insertAdjacentElement('beforebegin', $.newEl('h2','beforebegin'));
    target.insertAdjacentElement('afterend', $.newEl('h2','afterend'));
    // insertAdjacentText()
    target.insertAdjacentText('afterbegin','afterbegin');


    // .dataset
    // target.setAttribute('data-node-name',target.localName);
    // target.setAttribute('data-node-type',target.nodeType);
    // target.setAttribute('data-has-class',target.hasAttribute('class'));

    var dataMap = {
        'data-node-name' : target.localName,
        'data-node-type' : target.nodeType,
        'data-has-class' : target.hasAttribute('class')
    }
    $.setAttr(target, dataMap);
    console.log(target.dataset);
})(window, window.FDS, window.emmet);

//FDS <= prepend Child method