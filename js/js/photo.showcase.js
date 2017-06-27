(function(global,_){
    'use strict';
    var document = global.document;

    var list        = _.createEl('ul');
    var list_item   = _.createEl('li');
    var list_link   = _.createEl('a');
    var list_img    = _.createEl('img');
    var list_h2     = _.createEl('h2','새로운 것은 존재하지 않는다. 아직 내가 못 본 것일 뿐.');

    var list_link_href = document.createAttribute('href');
    var list_img_src   = document.createAttribute('src');
    var list_img_alt   = document.createAttribute('alt');

    list_link_href.nodeValue = 'https://github.com/chaaucindy';
    list_img_src.nodeValue   = 'https://unsplash.it/100/100?image=1073';
    list_img_alt.nodeValue   = 'photo 1073';

    list_link.setAttributeNode(list_link_href);
    list_img.setAttributeNode(list_img_src);
    list_img.setAttributeNode(list_img_alt);

    _.appendChild(list_h2,_.appendChild(list_item, list));
    _.appendChild(list_img,_.appendChild(list_link,list_item));
    console.log('list : ', list);

})//(window, window.FDS);

;(function(global, body, $){
    'use strict';
    
    // unsplash.it 이미지 소스 인덱스/대체텍스트 데이터
    var data = [
        { index: '998', alt: '편지왔어요' },
        { index: '977', alt: '버섯버섯' },
        { index: '817', alt: '1초 후' },
        { index: '837', alt: '개긴장' },
        { index: '146', alt: '훔쳐가지 마세요' },
        { index: '971', alt: '꽁꽁' },
        { index: '959', alt: '밤 하늘 터지는 등록금 ' },
        { index: '183', alt: '아저씨 안 어울려요.' },
        { index: '924', alt: '나무인지 이끼인지' },
        { index: '901', alt: 'auuuuurora' }
    ];
    var showcase_container = $.selector('.photo-showcase-container');
    var showcase_img = $.selector('.photo-showcase img');
    var list = $.selector('.photo-showcase-controller [role=tablist]');
    var indicator_first, indicator_last;
    var scr_width = window.screen.availWidth, scr_height = parseInt(window.screen.availWidth*0.21,10);

    function changeShowCaseView(item){
        return function(){
            var src = showcase_img.getAttribute('src');
            // showcase_img.src = src.replace(/=.+/,'='+item.index);
            showcase_img.src  = $.slice(src,'=')+item.index;
            showcase_img.alt = item.alt;
            body.style.backgroundImage = 'url(https://unsplash.it/'+scr_width+'/'+scr_height+'?blur&amp;image='+item.index+')';
            return false;
        }
    }
    for(var i=0, item; item = data[i];++i){
        var list_img = $.createEl('img');
        list_img.setAttribute('src','https://unsplash.it/80/80?image='+item.index);
        list_img.setAttribute('alt',item.alt);
        var list_link = $.createEl('a');
        list_link.setAttribute('role','tab');
        list_link.setAttribute('class','photo-showcase-indicator');
        list_link.setAttribute('href','');
        list_link.onclick = changeShowCaseView(item);
        // list_link.index = item.index; // a 객체에 속성을 할당하여 this.index 값으로 사용할 수 있다.
        var list_item = $.createEl('li');
        list_item.setAttribute('role','presentation');

        $.appendChild(list_img, list_link);
        $.appendChild(list_link, list_item);
        $.appendChild(list_item, list);
    }

    indicator_first = $.selector('li:first-child a',list);
    indicator_last = $.selector('li:last-child a', list);

    indicator_first.onfocus = function(){
        $.addClass(showcase_container, 'active');
    }
    indicator_last.onblur = function(){
        $.removeClass(showcase_container, 'active');
    }
})(window, window.document.body, window.FDS);