//sandbox, namespace, iife pattern

var Store = function(global){
    'use strict';

    var state = [];
    var config = {};
    var default_settings = {
        required: false,
        default: [],
        types: 'any'
    };

    var convertArray = function(o){
        return Array.prototype.slice.call(o);
    };
    var type = function(o){
        return Object.prototype.toString.call(o).toLowerCase().slice(8,-1);
    };
    var mixinObj = function(){
        var arg    = convertArray(arguments);
        //arg 내부의 요소가 모두 object인지 확인
        for(var i=arg.length;i--;){
            if( Store.type(arg[i]) !== 'object'){
                throw '전달인자로 객체만 가능합니다.';
            }
        }
        var rt_obj = arg.shift();
        var next   = arg.shift();
        do{
            for (var prop in next){
                if(next.hasOwnProperty(prop)){
                    rt_obj[prop] = next[prop];
                }
            }
             next   = arg.shift();
       }while(next);
       return rt_obj;
    };
    // 생성자 함수
    function Store (options){
        // if( this.constructor !== Store){
        if( !(this instanceof Store)){
            throw 'new Store() 형태로 사용하세요!';
        }
        this.init(options);
    };

    // 객체의 속성을 확장할 수 있는 메서드 추가
    Store.include = function(key, value){
        if ( key && typeof key === 'string'){
            Store[key] = value;
        }
        if ( key && !key.length && typeof key === 'object'){
            for (var prop in key){
                if(key.hasOwnProperty(prop)){
                    Store[prop] = key[prop];
                }
            }
        }
    };

    Store.include({
        default_settings : default_settings,
        type: type,
        mixin : mixinObj
    });
    Store.fn = Store.prototype = {
        constructor: Store,
        version:     '0.0.1',
        init:        function(options){
            if( options && Array.isArray(options)){//array

            }else if( options && !Array.isArray(options) && typeof options === 'object'){ //object
                // 객체 믹스인 (전달 값이 없을 경우 기본값을 사용하기 위해)
                mixin(config, default_settings, options);
                state = config.default;
            }else{

            }
        },
        create:      function(o){
            if(config.types !== 'any'){
                // data 의 type검증
            }
            state.push(o);
        },
        get:         function(){},
        update:      function(){},
        delete:      function(){}
    };

    return Store;
}(window);