

// ---------------------------------------
// 모듈 패턴

// ---------------------------------------
// 클로저(Closures)

// ---------------------------------------
// 엄격모드(Strict)
(function(global){
// ES5에서 추가된 엄격 모드(Strict Mode)는 기능 추가가 아닌,
// 오류 발생 가능성이 있는 코드를 제거하는 역할을 한다.
// 엄격 모드를 지원하는 브라우저에서는 오류 발생 가능성이 있는 코드 작성 시 오류를 발생하지만,
// 지원하지 않는 구형 브라우저는 이를 단순하게 무시한다. 즉, 호환성에 문제는 없다.
// (하위 호환성 유지) 엄격 모드는 개별적인 유효범위(함수, 전역 유효범위 등)
// 내부 첫 라인에 아래와 같은 문자열을 선언하면 된다.
    'use strict';
    // iiiick = 'ee';
    global.iiiick = 'ee';
    // console.log('ck : ',iiiick);
})(window);

// 엄격모드 사용 시 this
// 엄격모드 strict mode는 명시적인 실행자가 없을 시 this에 대해 오류를 반환한다.
function Fan(name){
    'use strict';
    console.log('this : ',this);
    this.name = name;
}
new Fan('name');    // 생성자 함수로 생성된 객체 Fan{}
// Fan('name');    // window.라는 명시적 실행자가 없어 undefined가 된다.

// javascript 병합 시 iife 패턴의 문제
// 함수 종료시 세미콜론 누락된 경우 
;(function(global){
    'use strict';
    // ....
})(window);

// ―――――――――――――――――――――――――――――――――
// 사용자 정의 객체
// ―――――――――――――――――――――――――――――――――
var fds = function(){
    'use strict';   //엄격모드로 수행
    var Slider = function(min, max, value, step){
        // new 를 강제화 시키는 패턴
        if (this.constructor !== Slider){
            // return new Slider(min, max, value, step);
            return new Slider.apply(null, arguments);
        }
        this.min   = min || 0;
        this.max   = max || 100;
        this.value = value || 0;
        this.step  = step || 1;
    }
    Slider.prototype = {
        constructor : Slider,
        move : function(){},
        stop : function(){}
    };

    return {
        ui:{
            Slider : Slider
        }
    }
}();
// ---------------------------------------
// Javascript 함수는 일급객체

// Javascript 함수는 일반 함수로서
// 때론 생성자 함수, 함수의 인자, 함수의 반환 값, 객체의 멤버, 배열의 원소로서 다양하게 사용된다.

// 일급객체(First-Class Object)의 특징

// 변수, 데이터 구조 안에 담을 수 있다.
// 인자(Parameter, Argument)로 전달할 수 있다.
// 반환 값(Return Value)으로 사용할 수 있다.
// 런타임(실행) 중에 생성할 수 있다.
// 할당에 사용된 이름과 관계 없이 고유하게 식별할 수 있다.

// CASE 1. 변수에 함수를 할당할 수 있다.
var showMeTheMoney = function(){};
// CASE 2. 함수의 인자로 함수가 전달될 수 있다.
function lifeCycle(callback){
    typeof callback === 'function' && callback();
}
lifeCycle(function(){
    console.log('this : ',this);
});
// CASE 3. 함수의 반환 값으로 함수를 내보낼 수 있다. (객체도 가능)
var fn = function(global){
    'use strict';
    return function(){};
}(window);
// CASE 4. 객체의 속성으로 함수를 설정할 수 있다. (메소드)
var obj = {
    member : fn
};
// CASE 5. 배열의 원소(Item)로 함수를 메모리할 수 있다.
var fnStack = [obj.fn];

// ---------------------------------------
// JavaScript는 객체 지향 언어
// class 기반의 다른 언어와 다른 형태로 객체 지향을 지원 ==> prototype 기반

// Javascript는 잘 알려진 객체 지향 언어의 Class와는 다른 방법(Prototype)으로 객체 지향을 구현할 수 있다.
// (ECMAScript 2015(ES6)에서는 Class를 사용할 수 있다) Javascript가 지원하는 프로토타입(Prototype)은
// 코드를 재사용하는 방법 중 하나로 객체의 능력을 상속(Inheritance) 할 수 있도록 구현한다.

// 사용자가 생성한 모든 함수는 prototype 속성(프로퍼티)을 가지는데 이는 프로토타입은 객체(빈 객체)를 참조한다.
// 프로토타입 객체에 멤버를 추가하면 상속을 통해 생성자를 통해 생성된 객체(인스턴스)는 이를 물려받아 사용가능하다.






function registerUserInfo(){ console.log('registerUserInfo 실행'); }
var getUserInfo = function(){ console.log('getUserInfo 실행'); };

console.groupCollapsed('함수 객체 검증');
// 헤당 객체가 함수인지 검증 후 실행
//  1. if 문을 이용
if (FDS.isFunction(registerUserInfo)){ registerUserInfo(); }
// 2. 논리연산자 (&&) 을 이용
FDS.isFunction(getUserInfo) && getUserInfo();
console.groupEnd('함수 객체 검증');

console.groupCollapsed('function scope');
var g_scope = '전역 변수';
function localScope(){
    //  변수 참조 우선순위
    // 1. 변수 영역 (지역)
    // 2. function parameters
    // 3. 상위 영역
    // 4. 전역
    // 5. ReferentceError!!
    console.log('g_scope : ',g_scope);

    innerScopeFunction();

    function innerScopeFunction (){
        console.log('l_scope : ',l_scope);
        var l_scope = '지역 변수';
    }
}
localScope();
console.groupEnd('function scope');
// ---------------------------------------
// this 컨텍스트
console.groupCollapsed('\'this\' Context in function');
// window 객체의 속성(메서드) 선언
function whoCallMe (){
    console.log('this : ',this);
}
window.whoCallMe(); // 명시적 호출
whoCallMe();    // 암시적 호출
// whatIsThis라는 속성(메서드)을 가진 me 객체 선언
var me = {
    // whatIsThis : whoCallMe
    whatIsThis : function(){
        console.log('this : ',this);
    }
}
me.whatIsThis();    //명시적 호출
//함수 참조 => 호출'()' 하지 않은 상태에서 참조한다
function getSomeItem(){
    console.log('this : ',this);
}
var ck = {
    name    : 'chaau',
    getItem : getSomeItem,
    getName : function(){
        console.log('this.name : ',this.name);
    },
    setName : function(new_name){
        this.name = new_name;
    }
}
FDS.isFunction(ck.getItem)  && ck.getItem();
console.groupEnd('\'this\' Context in function');
// ---------------------------------------
// Arguments(전달인자)와 Parameters(매개변수)
// function displayBlockElement(Parameters){}
// displayBlockElement(Arguments);
function displayBlockElement(el){
    // css 속성 적용 예시
    el.style.display = 'block';
    el.style.borderTopColor = '#f00';
    el.style['margin-right'] = '1rem';
}
// displayBlockElement( document.getElementById['app'] );
// ---------------------------------------
// Arguments(전달인자) 객체
// arguments 객체는 유사 배열로, length를 가지지만 배열의 메서드를 사용할 수 없다.
console.groupCollapsed('arguments element');
function sum(...n){
    for(var rt = 0, i =n.length; i--;){
        if(isNumber(n[i])){ rt += n[i]; }
    }
    return rt;
}
function anotherSum(){
    for(var rt = 0, i =arguments.length; i--;){
        var n = arguments[i];
        if(isNumber(n)){ rt += n; }
    }
    return rt;
}
function confirmArguments(){
    console.log('%c-------------------------------','color: #f00;');
    console.log('arguments.push : ',!!arguments.push);
    var args = FDS.convertArray(arguments);
    console.log('args.push : ',!!args.push);
}
confirmArguments(1,2,3);
console.groupEnd('arguments element');
// ---------------------------------------
// 재귀(再歸) 함수
console.groupCollapsed('재귀함수 호출');
function factorial(n){
    var result = n;
    while(--n){ result *= n; }
    return result;
}
console.log('factorial(9) : ',factorial(9));
console.log('%c-------------------------------','color: #f00;');
function factorial2(n){
    if(n < 2) { return 1; }
    return n * factorial2(--n); 
}
console.log('factorial2(9) : ',factorial2(9));
console.groupEnd('재귀함수 호출');

// ―――――――――――――――――――――――――――――――――
// function 객체 prototype 의 property & method 
// function.prototype
console.groupCollapsed('function prototype');
var electric_fan = {
    name    : '선풍기',
    on      : function (power, timer){
            power = power || 1;
            timer = timer || 1;
            console.log(this.name +'을(를) 파워! '+ power + '만큼 세기로 ' + timer + '시간동안 가동하다');
    },
    off     : function(){
            console.log(this.name + '을(를) 가동 중지하다');
    }
}
electric_fan.on(4);
var air_conditioner = {
    name: '에어컨'
}
electric_fan.on.call(air_conditioner, 10, 3);   // 인자값을 콤마(,)로 구분하여 전달
electric_fan.on.apply(air_conditioner, [7,2]);  // 인자값을 배열 형식으로 전달
console.log('%c-------------------------------','color: #f00;');
// bind()
// function을 반환하며, 즉시 실행되지 않는다.
air_conditioner.on = electric_fan.on.bind(air_conditioner, 10, 4);
window.setTimeout(air_conditioner.on, 3000);

console.groupEnd('function prototype');
// ---------------------------------------
// 즉시 실행 함수 (IIFE)
// 객체 값을 변수에 참조한 예
var memorial_card = {};

// IIFE 패턴을 사용하여 실행된 결과 값 객체를 반환 받은 변수 예
var another_memorial_card = (function(){
  return {};
}());














// * 년,월,일 데이터를 입력하면 텍스트를 반환하는 함수
//     ex ) 함수명('2017','6','7') => '2017년 6월 7일 수요일'

//  - 각 년, 월, 일, 요일을 텍스트로 반환하는 함수는 내부 함수
//  - 전역으로 접근 가능한 하나의 함수에서 나머지 4개의 함수를 호출하여 return값 생성

 var getDate = function(){
    function getYear(date){
        return date.getFullYear() + '년';
    }
    function getMonth(date){
        return date.getMonth() + '월';
    }
    function getDate(date){
        return date.getDate() + '일';
    }
    function getDay(date){
        var day = date.getDay();
        var weekdays = "일월화수목금토";
        for(var i=0; i < weekdays.length; i++){
            if(day === i){ return weekdays[i] + '요일'; }
        }
    }
    function getDateString(year, month, day){
        date = new Date(year, month, day);
        return getYear(date) + ' ' + getMonth(date) + ' ' + getDate(date) + ' ' + getDay(date);
    }
    
    return {
        getDateString : getDateString
    }
 }();

// 외부에서 변수.텍스트조합('2017','6','7')로 호출

// ** new Date('2017','6','7') 과 같이 생성자를 호출하면 날짜 데이터가 생성된다.



// 4)
// 아래와 같은 경고 생성기를 몇 개 더 만들었고 갑자기 발생하는 위험에 대비하기로 했다.
// 위와 같이 이미 만들어진 경고 메시지를 검토하고, 이 상황에 맞는 적절한 함수를 호출해라. 적절한 매개변수를 넣는 것 또한 잊지 마라. 딱 코드 두 줄이면 된다.
// ============================
// function warningMaker(monster) {
//   return function(number, location) {
//     alert("Beware! There have been " + monster +
//           " sightings in Seoul today!\n" +
//           number + " have been spotted at the " +
//           location + "!");
//   };
// }

// // call the two functions here

















