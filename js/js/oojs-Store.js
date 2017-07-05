// 저장소 데이터 관리 패턴을 적용한 라이브러리
// Store 생성자 함수
// var book_list = new Store();


// Store API
    // [private]
    // state

    // [public]
    // .pushData(data)
    // .readData([idx])
    // .writeData(idx, fixed_data)
    // .removeData([idx])

var Store = (function(global){
    'use strict';

    // 관리되는 데이터는 내부에 정의하여 공개되지 않도록 한다.
    var state = [];

    function _store(data){
        this.init(data);
    }

    _store.prototype.init = function(data){
        if(Array.isArray(data)){ state = data; }
    }
    _store.prototype.pushData = function(data){
        data && state.push(data);
    }
    _store.prototype.writeData = function(index, new_item){
        state[index] && new_item && state.splice(index, 1, data);
    }
    _store.prototype.removeData = function(index){
        state[index] && state.splice(index, 1);
    }
    _store.prototype.readData = function(index){
        if(index === undefined){
            return state;
        }else if (typeof index === 'number' && index >= 0){
            return state[index];
        }
    }
    
    return _store;
})(window);