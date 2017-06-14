// HTML DOM 방식
(function(global, document){
    'use strict';
    var html, head, body;
    html = document.documentElement;
    head = document.head;
    console.log('html : ', !!html);   
    console.log('head : ', !!head);
    console.log('before load body : ', !!body);    

    // function init(){
    //     body = document.body;
    //     console.log('after load body : ', !!body);    
    // }
    // global.onload = init;
})//(window, window.document)
// Core(XML) DOM 방식
;(function(global, document){
    'use strict';
    // var html, head, body;
    // html = document.getElementsByTagName('html').item(0);
    // head = document.getElementsByTagName('head').item(0);
    // body = document.getElementsByTagName('body').item(0);

    // DOM API를 통해 NodeList에 접근한 후 개별 아이템을 추출
    var headline = document.getElementsByTagName('h1')[0];
    var abbr_in_headline = headline.getElementsByTagName('abbr')[0];
    
    console.log('h1의 부모 노드는? : ', headline.parentNode);
    console.log('h1의 첫번째 자식요소 : ', headline.firstChild);
    console.log('h1의 마지막 자식요소 : ', headline.lastChild);

    console.log('abbr의 이전 형제요소: ', abbr_in_headline.previousSibling);
    console.log('abbr의 다음 형제요소: ', abbr_in_headline.nextSibling);
    console.log('abbr의 다음 형제요소: ', abbr_in_headline.nextElementSibling);

    var headline_childs = onlyElementNodeCollection(headline);
    console.log(' headline_childs : ',  headline_childs);

    function onlyElementNodeCollection(el){
        if (!el || el.nodeType !== 1){ 
            throw '요소노드를 전달하세요.';
        }
        var el_childs = el.childNodes;
        var node_collection = [];
        var l = el_childs.length;
        while(l--){
           var child = el_childs[l];
           child.nodeType === 1 && node_collection.push(child);
        }
        return node_collection;
    }
})//(window, window.document)
// DOM API 탐색(Travelsing) 속성
;(function(global){
    'use strict';
    var document = global.document;

    // NODE.children VS NODE.childNodes

    var target = document.getElementById('target-parent');
    
    console.log('target.childNodes : ', target.childNodes);
    console.log('target.children : ', target.children);
    
    console.log(target.firstChild === target.childNodes[0]);
    console.log(target.lastChild === target.childNodes[target.childNodes.length-1]);
})//(window)
;(function(global){
    'use strict';
    var document = global.document;

    //  nodeName, nodeType, nodeValue
    var target_parent, target_headline, target_abbr;
    var target_parent, target_headline, target_abbr;

    target_parent = document.getElementById('target-parent');
    // target_headline = target_parent.firstChild;
    // target_abbr = target_headline.firstChild;
    target_headline = target_parent.getElementsByTagName('h1')[0];
    target_abbr = target_headline.getElementsByTagName('abbr')[0];

    console.log('target_parent.nodeName : ',    target_parent.nodeName);
    console.log('target_parent.localName : ',   target_parent.localName);
    console.log('target_parent.nodeType : ',    target_parent.nodeType);
    console.log('target_parent.nodeValue : ',   target_parent.nodeValue);
    console.log('%c-------------------------------','color: #f00;');
    console.log('target_headline.nodeName : ',  target_headline.nodeName);
    console.log('target_headline.nodeType : ',  target_headline.nodeType);
    console.log('target_headline.nodeValue : ', target_headline.nodeValue);
    console.log('%c-------------------------------','color: #f00;');
    console.log('target_abbr.nodeName : ',      target_abbr.nodeName);
    console.log('target_abbr.nodeType : ',      target_abbr.nodeType);
    console.log('target_abbr.nodeValue : ',     target_abbr.nodeValue);
    console.log('target_abbr.textContent : ',   target_abbr.textContent);
    console.log('target_abbr.innerText : ',     target_abbr.innerText);
})//(window)
;(function(global, document, $){
    'use strict';
    var target_parent       = $.id('target-parent'),
        target_headline     = $.tag('h1'),
        target_abbr         = $.tag('abbr',target_headline),
        all_els             = $.tagAll('*', target_parent);

    console.log('target_parent : ',   target_parent);
    console.log('target_headline : ', target_headline);
    console.log('target_abbr : ',     target_abbr);
    console.log('all_els : ',         all_els);

    console.log('$.firstChild(target_parent) : ', $.first(target_headline));
    console.log('$.last(target_parent) : ', $.last(target_parent));
    console.log('$.next(target_headline) : ', $.next(target_headline));
    console.log('$.next(target_parent) : ', $.next(target_parent));
    console.log('$.prev(target_next) : ', $.prev($.id('target-next')));

    console.log('head_first_next : ', $.next($.first(document.head)).nodeName);
    console.log('body_last_prev : ', $.prev($.last(document.body)).nodeName);


})//(window, window.document, window.FDS)
;

// Node methods 
//  appendChild() 
//  cloneNode() 
//  compareDocumentPosition() 
//  contains() 
//  hasChildNodes() 
//  insertBefore() 
//  isEqualNode() 
//  removeChild() 
//  replaceChild()
 
//  Document methods 
//  document.createElement() 
//  document.createTextNode() 
 
//  HTML*Element properties 
//  innerHTML 
//  outerHTML 
//  textContent 
//  innerText 
//  outerText 


(function(global, document, _){
    'use strict';
    
    var fds = _.id('FDS');
    // console.log('fds : ', fds);
    var study_content = _.id('study-content');
    // console.log('study_content : ', study_content);
    var study_content_list = _.tagAll('li',study_content);
    // console.log('study_content_list : ', study_content_list);
    var study_content_links = _.tagAll('a',study_content);
    // console.log('study_content_links : ', study_content_links);
    var study_content_first_child = _.first(study_content);
    var study_content_last_child = _.last(study_content);
    var study_content_first_child_next = _.next(study_content_first_child);
    var study_content_last_child_prev = _.prev(study_content_last_child);
    // console.log( study_content_first_child);
    // console.log(study_content_first_child_next);
    // console.log(study_content_last_child_prev);
    // console.log(study_content_last_child);

    // study_content_links _ EVENT HANDLER
    //console.log('Array.isArray(study_content_links) : ', Array.isArray(study_content_links));   //false
    //console.log('_.type(study_content_links) : ', _.type(study_content_links)); //htmlcollection
    var activeParent = function(){
        // console.log('this : ', this);
        // this의 부모객체를 찾아서 'active' 클래스 속성을 추가
        _.parent(this).className = 'active';
        // browser Prevent Default
        return false;
    };

    for(var i=0, l=study_content_links.length; i < l; ++i){
        var link = study_content_links[i];
        link.onclick = activeParent;
    }

})//(window, window.document, window.FDS)

;(function(global, document, $){
    'use strict';
    var body = $.tag('body');
    var body_items = $.tagAll('*',body);    //body요소 내부의 모든 엘리먼트 수집
    var empty_el = [];
    for (var i=body_items.length, item; item = body_items.item(--i);){
        if(item.nodeName !== 'SCRIPT' && !$.hasChild(item)){
            empty_el.push(item);
            $.parent(item).removeChild(item);  // 빈 요소를 삭제
        }
    }
    // console.log('empty_el : ', empty_el.reverse());
})//(window, window.document, window.FDS);

;(function(global, document, $){
    'use strict';
    var body = $.tag('body');
    var linkContent = $.classAll('link-content');
    console.log('linkContent : ', linkContent);
})(window, window.document, window.FDS);