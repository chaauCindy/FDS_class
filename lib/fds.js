// 전역과 구분되는 독립된 공간을 형성
// 모듈을 구현해서 내부에 점급 가능한 객체를 만들자.
var FDS = function (global){
    //클로저 영역
    // 클로저를 기억하는 객체를 반환
    // 전역에서 접근 가능한 네임스페이스 FDS

    function type(obj){
        return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
    }
    function isType(data, kind){
        validateError(kind, '!string','2번째 인자는 문자열이 전달되어야 합니다.');
        return type(data) === kind;
    }
    function validateError(data, kind, message){
        data = type(data);
        if (kind.indexOf('!') > -1){
            if(data !== kind.slice(1)){ throw message || '두 값이 일치하지 않습니다.'; }
        } else {
            if(data === kind){ throw message || '두 값은 일치하지 않아야 합니다.'; } 
        }
        return '오류는 발생하지 않았습니다.';
    }
    function getRnd(num1, num2){
        var min = Math.min(num1 || 2, num2 || 0);
        var max = Math.max(num1 || 2, num2 || 0);
        return Math.round( Math.random() * (max - min)) + min;
    }
    function getDayString(day){
        validateError(day,"!number","인자값은 숫자형이어야 합니다.");
        if(!(/[0-6]/.test(day))) { throw "인자값은 0~6 사이의 숫자이어야 합니다."}
        var weekdays = "일월화수목금토";
        for(var i=0; i < weekdays.length; i++){
            if(day === i){ return weekdays[i] + '요일'; }
        }
    }
    function isNumber(data){ 
        return isType(data,'number') && !Number.isNaN(data);
    }
    function isString(data){ 
        return isType(data,'string');
    }
    function isBoolean(data){ 
        return isType(data,'boolean');
    }
    function isFunction(data){ 
        return isType(data,'function');
    }
    function isArray(data){ 
        return isType(data,'array');
    }
    function isObject(data){ 
        return isType(data,'object');
    }
    function convertArray(o){
        return Array.prototype.slice.call(o);  
    }

    // ―――――――――――――――――――――――――――――――――
    // DOM 선택 API : 유틸리티 함수 
    // ―――――――――――――――――――――――――――――――――
    function isElNode(el){
        return (el.nodeType === 1);
    }
    function isTxtNode(el){
        return (el.nodeType === 3);
    }
    function validateElNode(el){
        if (!el || !isElNode(el)){ 
            throw 'Element Node를 전달해야합니다.'; 
        }
    }
    function id(n){
        validateError(n,"!string","인자값은 문자여야 합니다.");
        return document.getElementById(n);
    }
    function tagAll(n,context){
        validateError(n,"!string","인자값은 문자여야 합니다.");
        if ( context && context !== document && !isElNode(context)){ throw '대상 객체는 Element Node여야 합니다.'; }
        return (context || document).getElementsByTagName(n);
    }
    function tag(n,context){
        return tagAll(n,context)[0];
    }
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
    // ―――――――――――――――――――――――――――――――――
    // class utility
    // ―――――――――――――――――――――――――――――――――
    var addClass = function(el, n){
        validateElNode(el);
        validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');
        
        var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)');
        var class_list = el.getAttribute('class');
        if(!regexp.test(class_list)){
            class_list += ' ' + n;
            el.setAttribute('class', class_list);
        }
        return true;
    };
    var removeClass = function(el, n){
        validateElNode(el);
        validateError(n, '!string','클래스 이름은 텍스트여야 합니다.');

        var regexp = new RegExp('(^|\\s)' + n + '(\\s|$)','g');
        var class_list = el.getAttribute('class');
        class_list = class_list.replace(regexp, '');
        el.setAttribute('class',class_list);
        return true;
    };
    // ―――――――――――――――――――――――――――――――――
    // string utility 
    // ―――――――――――――――――――――――――――――――――
    var slice = function(str, char){ //str 문자열 내 char 문자까지의 텍스트를 반환
        validateError(str, '!string','첫번째 인자값은 텍스트여야 합니다.');
        return str.slice(0, str.indexOf(char) + 1);
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
        classAll      : classAll,
        selector      : query,
        selectorAll   : queryAll,
        appendChild   : append,
        createEl      : createEl,
        slice         : slice,
        addClass      : addClass,
        removeClass   : removeClass
    }
}(window);