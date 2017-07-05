// 전역과 구분되는 독립된 공간을 형성
// 모듈을 구현해서 내부에 점급 가능한 객체를 만들자.
var FDS = function (global){
    //클로저 영역
    // 클로저를 기억하는 객체를 반환
    // 전역에서 접근 가능한 네임스페이스 FDS
    var document = global.document;
    var toString = Object.prototype.toString;
    var forEach = Array.prototype.forEach;

    function type(obj){
        return toString.call(obj).slice(8,-1).toLowerCase();
    };
    function isType(data, kind){
        validateError(kind, '!string','2번째 인자는 문자열이 전달되어야 합니다.');
        return type(data) === kind;
    };
    function validateError(data, kind, message){
        data = type(data);
        if (kind.indexOf('!') > -1){
            if(data !== kind.slice(1)){ throw message || '두 값이 일치하지 않습니다.'; }
        } else {
            if(data === kind){ throw message || '두 값은 일치하지 않아야 합니다.'; } 
        }
        return '오류는 발생하지 않았습니다.';
    };
    function getRnd(num1, num2){
        var min = Math.min(num1 || 2, num2 || 0);
        var max = Math.max(num1 || 2, num2 || 0);
        return Math.round( Math.random() * (max - min)) + min;
    };
    function getDayString(day){
        validateError(day,"!number","인자값은 숫자형이어야 합니다.");
        if(!(/[0-6]/.test(day))) { throw "인자값은 0~6 사이의 숫자이어야 합니다."}
        var weekdays = "일월화수목금토";
        for(var i=0; i < weekdays.length; i++){
            if(day === i){ return weekdays[i] + '요일'; }
        }
    };
    function isNumber(data){ 
        return isType(data,'number') && !Number.isNaN(data);
    };
    function isString(data){ 
        return isType(data,'string');
    };
    function isBoolean(data){ 
        return isType(data,'boolean');
    };
    function isFunction(data){ 
        return isType(data,'function');
    };
    function isArray(data){ 
        return isType(data,'array');
    };
    function isObject(data){ 
        return isType(data,'object');
    };
    function convertArray(o){
        return Array.prototype.slice.call(o);  
    };
    // ―――――――――――――――――――――――――――――――――
    // DOM 선택 API : 유틸리티 함수 
    // ―――――――――――――――――――――――――――――――――
    function isElNode(el){
        return (el.nodeType === 1);
    };
    function isTxtNode(el){
        return (el.nodeType === 3);
    };
    function validateElNode(el){
        if (!el || !isElNode(el)){ 
            throw 'Element Node를 전달해야합니다.'; 
        }
    };
    function id(n){
        validateError(n,"!string","인자값은 문자여야 합니다.");
        return document.getElementById(n);
    };
    function tagAll(n,context){
        validateError(n,"!string","인자값은 문자여야 합니다.");
        if ( context && context !== document && !isElNode(context)){ throw '대상 객체는 Element Node여야 합니다.'; }
        return (context || document).getElementsByTagName(n);
    };
    function tag(n,context){
        return tagAll(n,context)[0];
    };
    var classAll = function(){
        var _classes;
        if (!'getElementsByClassName' in Element.prototype){
            _classes = function(n, context){
                validateError(n,'!string','첫번째 인자는 문자열을 전달해야 합니다.');
                context = context || document.body;
                validateElNode(context);
                return context.getElementsByClassName(n);
            }
        } else {
            _classes = function(n, context){
                if(n === ''){ return []; }
                validateError(n,'!string','첫번째 인자는 문자열을 전달해야 합니다.');
                context = context || document.body;
                validateElNode(context);
                var _all = tagAll('*', context),
                    _matched =[],
                    _match = new RegExp('(^|\\s)' + n + '(\\s|$)'); // (시작|공백)+classname+(공백|끝)
                for(var i=_all.length, _el; _el=_all[--i];){
                    if (_match.test(_all[i].className)){ _matched.push(_el); }
                }
                return _matched.reverse();
            }
        }
        return _classes;
    }();
    var query = function(selector, context){
        return queryAll(selector, context)[0];
    };
    var queryAll = function(selector, context){
        validateError(selector,'!string','첫번째 인자는 문자열을 전달해야 합니다.');
        context = context || document.body;
        validateElNode(context);
        return context.querySelectorAll(selector);
    };
    // ―――――――――――――――――――――――――――――――――
    // DON 탐색 API 
    // ―――――――――――――――――――――――――――――――――
    var firstChild = function(){    // 브라우저의 firstElementChild 지원여부를 중복호출하는 것을 막기위해 클로저함수
        var _firstChild = null;
        if ('firstElementChild' in Element.prototype){
            _firstChild = function(el){
                validateElNode(el);
                return el.firstElementChild;
            };
        }else {
            _firstChild = function(el){
                validateElNode(el);
                return el.children[0];
            };
        }
        return _firstChild;
    }();
    var lastChild = function(){
        var _lastChild = null;
        if ('lastElementChild' in Element.prototype){
            _lastChild = function(el){
                validateElNode(el);
                return el.lastElementChild;
            };
        }else {
            _lastChild = function(el){
                var children = el.children;
                return children[--children.length];
            };
        }
        return _lastChild;
    }();
    var nextSibling = function(){
        var _nextSibling = null;
        if ('nextElementSibling' in Element.prototype){
            _nextSibling = function(el){
                validateElNode(el);
                return el.nextElementSibling;
            };
        }else {
            _nextSibling = function(el){
                validateElNode(el);
                do {
                    el = el.nextSibling;
                } while (el && !isElNode(el));
                return el;
            };
        }
        return _nextSibling;
    }();
    var prevSibling = function(){
        var _prevSibling = null;
        if ('previousElementSibling' in Element.prototype){
            _prevSibling = function(el){
                validateElNode(el);
                return el.previousElementSibling;
            };
        }else {
            _prevSibling = function(el){
                validateElNode(el);
                do {
                    el = el.previousSibling;
                } while (el && !isElNode(el));
                return el;
            };
        }
        return _prevSibling;
    }();
    var parentNode = function(el, depth){
        validateElNode(el);
        depth = depth || 1;
        do{ el = el.parentNode; }
        while ( el && --depth);
        return el;
    };
    var hasChild = function(el){
        validateElNode(el);
        return el.hasChildNodes();
    };
    var eachArray = function(){
        if(forEach){
           return function (el, callback){
                return el.forEach(callback);
            } 
        }else{
            return function (el, callback){
                for(var i=0, l=el.length; i < l; i++){
                    callback(el[i], i, el);
                }
            }
        }
    }();
    var each = function(el, callback){
        validateError(callback, '!function');
        if ( !isObject(el) && el.length) { el = convertArray(el); }
        isArray(el) && eachArray(el, callback);

        if (isObject(el)){
           for (var key in el){ el.hasOwnProperty(key) && callback(key, el[key], el); }
        }
        if(isElNode(el)){
            for (var key in el){ callback(key, el[key], el); }
        }
    };  
    // ―――――――――――――――――――――――――――――――――
    // DOM 생성/조작 API 
    // ―――――――――――――――――――――――――――――――――
    var createElement = function(el){
        validateError(el, '!string','전달 인자는 텍스트여야 합니다.');
        return document.createElement(el);
    };
    var createText = function(txt){
        validateError(txt, '!string','전달 인자는 텍스트여야 합니다.');
        return document.createTextNode(txt);
    };
    var append = function(el, target){
        target = target || document.body;
        validateElNode(target);
        if (!el && !isElNode(el) && !isTxtNode(el)) { throw '첫번째 전달 인자는 node여야 합니다.'}
        return target.appendChild(el);
    };
    var createEl = function(name, content){
        validateError(name, '!string','전달 인자는 텍스트여야 합니다.');
        var el = createElement(name);
        if (content && isType(content, 'string')) {
            var text = createText(content);  
            append(text, el);
        }
        return el;
    };
    var insertBefore = function(insert, target){
        validateElNode(insert);
        validateElNode(target);        
        parentNode(target).insertBefore(insert, target);
        return insert;
    };
    var before = function(target, insert){
        return insertBefore(insert, target);
    };
    var prependChild = function(parent, child){
        validateElNode(parent);
        validateElNode(child);
        var target = firstChild(parent);
        return target ? insertBefore(child, target) : append(child, parent);
    };
    var insertAfter = function(insert, target){
        validateElNode(insert);
        validateElNode(target);
        var next = nextSibling(target);
        return next ? insertBefore(insert, next) : append(insert, parentNode(target));
    };
    var after = function(target, insert){
        return insertAfter(insert, target);
    };
    var removeChild = function(child){
        validateElNode(child);
        return parentNode(child).removeChild(child);        
    };
    var replaceChild = function(replace, target){
        validateElNode(replace);
        validateElNode(target);
        return parentNode(target).replaceChild(replace, target);
    };
    var cloneNode = function(el, deep){
        validateElNode(el);
        var copied_node = el.cloneNode(true);
        // event clone
        if(deep){
            var focusables = queryAll('[href], button, input', el);
            var copied_focusables = queryAll('[href], button, input', copied_node);
            each(focusables,function(item, index, o){
                each(item, function(key, value){
                    if(key.indexOf('on') === 0 && isFunction(value)) {
                        copied_focusables[index][key] = value;
                    }
                });
            });
        }
        return copied_node;
    };
    var innerHtml = function(target, html){
        return html? target.innerHTML = html : target.innerHTML;
    };
    var innerText = function(target, text){
        return text? target.innerTEXT = text : target.innerTEXT;
    };
    // ―――――――――――――――――――――――――――――――――
    // 속성 조작 
    // ―――――――――――――――――――――――――――――――――
    var attr = function(o, prop, value){
        if(!o || !prop){
            throw '첫번짜, 두번째 전달인자는 필수입니다.';
        }
        var isobj = isObject(prop);
        if(isElNode(o)){ o = [o]; }
        if(!value && !isobj){
            return o[0].getAttribute(prop);
        }else{
            each(o, function(item){
                if(isobj){
                    each(prop, function(key, val){
                        item.setAttribute(key, val);
                    });
                } else {
                    item.setAttribute(prop, value);
                }
            });
        }
    };
    var removeAttr = function(o, prop){
        if(!o || !prop){
            throw '첫번짜, 두번째 전달인자는 필수입니다.';
        }
        if(isElNode(o)){ o = [o]; }
        each(o, function(item){
            item.removeAttribute(prop);
        });
    };
    // value에 +=, -= 값이 포함되어 있을 경우 연산된 값을 대입        
    //style에 inline 스타일로 (텍스트, 오브젝트..) 추가할 수 있음 (.cssText 메소드 사용)
    var cssStyle = function(){
        var _cssStyle = undefined;
        if(window.getComputedStyle){
            _cssStyle = function(o, style, value){
                validateElNode(o);
                if (style.indexOf(';') > -1){
                    o.style.cssText(style);
                }else{
                    var current_value =  window.getComputedStyle(o)[style];
                    if (!value){
                        return current_value;
                    }else{
                        if(value.indexOf('+=') === 0){
                            current_value += value;
                        } else if(value.indexOf('-=') === 0){
                            current_value -= value;
                        } else {
                            current_value = value;
                        }
                        window.getComputedStyle(o)[style] = current_value;
                    }
                }
            }
        }else{
            _cssStyle = function(o, style, value){
                validateElNode(o);
                 if (style.indexOf(';') > -1){
                    o.style.cssText(style);
                }else{
                    var current_value = o.currentStyle[style];
                    if (!value){
                        return current_value;
                    }else{
                        if(value.indexOf('+=') === 0){
                            current_value += value;
                        } else if(value.indexOf('-=') === 0){
                            current_value -= value;
                        } else {
                            current_value = value;
                        }
                        o.currentStyle[style] = current_value;
                    }
                }
            }
        }
        return _cssStyle;
    }();
    // ―――――――――――――――――――――――――――――――――
    // event util 
    // ―――――――――――――――――――――――――――――――――
     var addEvent = function(){
        if('addEventListener' in EventTarget.prototype){
            return function(el, type, handler, capture){
                el.addEventListener(type, handler, capture || false);
            }
        }else if('attachEvent' in EventTarget.prototype){
            return function(el, type, handler, capture){
                el.attachEvent('on'+type, handler);
            }
        }else{
            return function(el, type, handler, capture){
                el['on'+type] = handler;
            }
        }
    }();
    var removeEvent = function(){
        if('addEventListener' in EventTarget.prototype){
            return function(el, type, handler, capture){
                el.removeEventListener(type, handler, capture || false);
            }
        }else if('attachEvent' in EventTarget.prototype){
            return function(el, type, handler, capture){
                el.detachEvent('on'+type, handler);
            }
        }else{
            return function(el, type, handler, capture){
                el['on'+type] = null;
            }
        }
    }();
    // ―――――――――――――――――――――――――――――――――
    // class utility
    // ―――――――――――――――――――――――――――――――――
    var classUtil = function(){
        if( 'classList' in Element.prototype){
            return {
                hasClass : function(el, n){
                    validateElNode(el);
                    validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                    return el.classList.contains(n);
                },
                addClass : function(el, n){
                    validateElNode(el);
                    validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                    return el.classList.add(n);
                },
                removeClass : function(el, n){
                    validateElNode(el);
                    validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                    return el.classList.remove(n);
                },
                toggleClass : function(el,n){
                    return el.classList.toggle(n);
                }
            };
        } else {
            return {
                hasClass : function(el, n){
                    validateElNode(el);
                    validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                    var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)');
                    var class_list = el.getAttribute('class');
                    return regexp.test(class_list);
                },
                addClass : function(el, n){
                    if(!hasClass(el, n)){ el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + n); }
                    return el;
                },
                removeClass : function(el, n){
                    validateElNode(el);
                    // validateError(n, '!string','클래스명은 텍스트여야 합니다.');
                    // 클래스명이 전달되지 않으면 모든 클래스 제거
                    var class_list = '';
                    if (n) {
                        var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)','g');
                        class_list = el.getAttribute('class');
                        class_list = class_list.replace(regexp, '');
                    }
                    el.setAttribute('class', class_list);
                    return el;
                },
                toggleClass : function(el, n){
                    return hasClass(el, n)? removeClass(el,n) : addClass(el,n);
                }
            };
        }
    }();
    var hasClass = function(){
        if( 'classList' in Element.prototype){
            return function(el, n){
                validateElNode(el);
                validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                return el.classList.contains(n);
            }
        } else {
            return function(el, n){
                validateElNode(el);
                validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)');
                var class_list = el.getAttribute('class');
                return regexp.test(class_list);
            }
        }
    }();
    var addClass = function(){
        if( 'classList' in Element.prototype){
            return function(el, n){
                validateElNode(el);
                validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                return el.classList.add(n);
            }
        }else{
            return function(el, n){
                if(!hasClass(el, n)){ el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + n); }
                return el;
            }
        }
    }();
    var removeClass = function(){
        if( 'classList' in Element.prototype){
            return function(el, n){
                validateElNode(el);
                validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
                return el.classList.remove(n);
            }
        } else {
            return function(el, n){
                validateElNode(el);
                // validateError(n, '!string','클래스명은 텍스트여야 합니다.');
                // 클래스명이 전달되지 않으면 모든 클래스 제거
                var class_list = '';
                if (n) {
                    var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)','g');
                    class_list = el.getAttribute('class');
                    class_list = class_list.replace(regexp, '');
                }
                el.setAttribute('class', class_list);
                return el;
            }
        }
    }();
    var toggleClass = function(){
        if( 'classList' in Element.prototype){
            return function(el,n){
                return el.classList.toggle(n);
            }
        }else{
            return function(el, n){
                return hasClass(el, n)? removeClass(el,n) : addClass(el,n);
            }
        }
    }();
    var radioClass = function(el, n){
        validateElNode(el);
        validateError(n, '!string','클래스명은 텍스트여야 합니다.');
        var _siblings = queryAll('.' + n, parentNode(el));
        for(var i=0, l=_siblings.length;i<l;++i){
            removeClass(_siblings[i], n);
        }
        return addClass(el, n);
    };
    // ―――――――――――――――――――――――――――――――――
    // string utility 
    // ―――――――――――――――――――――――――――――――――
    var slice = function(str, char){ //str 문자열 내 char 문자까지의 텍스트를 반환
        validateError(str, '!string','첫번째 인자값은 텍스트여야 합니다.');
        return str.slice(0, str.indexOf(char) + 1);
    };
    var replaceAll = function(str, old_str, new_str){
        validateError(str, '!string','인자값은 텍스트여야 합니다.');
        validateError(old_str, '!string','인자값은 텍스트여야 합니다.');
        new_str = null || '';
        return str.split(old_str).join(new_str);
    };
    return{
        info: {
            version : '0.0.1',
            author  : 'chaau',
            url     : 'https://chaau.github.io',
            license : 'MIT'
        },
        // 공개 유틸리티
        //js API
        type          : type,
        isNumber      : isNumber,
        isFunction    : isFunction,
        isArray       : isArray,
        validateError : validateError,
        convertArray  : convertArray,
        //DOM 선택 API
        id            : id,
        tag           : tag,
        tagAll        : tagAll,
        first         : firstChild,
        last          : lastChild,
        next          : nextSibling,
        prev          : prevSibling,
        parent        : parentNode,
        hasChild      : hasChild,
        each          : each,
        classAll      : classAll,
        selector      : query,
        selectorAll   : queryAll,
        //DOM 생성 및 조작
        appendChild   : append,
        prepend       : prependChild,
        removeChild   : removeChild,
        createEl      : createEl,
        newEl         : createEl,
        insertBefore  : insertBefore,
        insertAfter   : insertAfter,
        after         : after,
        before        : before,
        replaceChild  : replaceChild,
        clone         : cloneNode,
        HTML          : innerHtml,
        TEXT          : innerText,
        // attr util
        attr          : attr,
        removeAttr    : removeAttr,
        css           : cssStyle,
        // Class Util
        hasClass      : hasClass,
        addClass      : addClass,
        removeClass   : removeClass,
        toggleClass   : toggleClass,
        radioClass    : radioClass,
        // event util
        addEvent      : addEvent,
        removeEvent   : removeEvent,
        // Text Util
        slice         : slice,
        replaceAll    : replaceAll
    }
}(window);