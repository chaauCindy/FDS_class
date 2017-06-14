// ―――――――――――――――――――――――――――――――――
// open/close toggle 
// is_opened = !is_opened;
// ―――――――――――――――――――――――――――――――――
var is_opened = true;
if( is_opened ){
    is_opened = false;
} else {
    is_opened = true;
}
console.log('is_opened : ',is_opened);
console.log('%c-------------------------------','color: #f00;');

// ―――――――――――――――――――――――――――――――――
// ―――――――――――――――――――――――――――――――――
// 뮤직 플레이어의 상태를 플레이어의 LCD에 display 
// ―――――――――――――――――――――――――――――――――
var music_player_state = 'play'; // 'play', 'pause', 'stop'
var state_manager = [
    {
        'state' : 'play',
        'message' : 'music player state is : PLAY' 
    },
    {
        'state' : 'stop',
        'message' : 'music player state is : STOP' 
    },
    {
        'state' : 'pause',
        'message' : 'music player state is : PAUSE' 
    },
    {
        'state' : 'unknown',
        'message' : 'music player state is : UNKNOWN' 
    }
];
var video_state;
video_state = state_manager[ getRnd(state_manager.length-1) ];

console.groupCollapsed('조건문');
    if ( isType(video_state, 'object') ) {
        console.log( video_state.message );
    } else {
        console.log( state_manager[state_manager.length-1].message );
    }

    switch (type(video_state)) {
        case 'object':
            console.log( video_state.message );
            break;
        default:
            console.log( state_manager[state_manager.length-1].message );
            break;
    }

    if ( isType(video_state, 'object') ) {
        switch (video_state.state) {
            case 'play' :
            case 'stop' :
            case 'pause' :
            default:
                console.log('video_state.message : ', video_state.message);
        }
    }
console.groupEnd('조건문');
// ―――――――――――――――――――――――――――――――――
// switch 문 
// ―――――――――――――――――――――――――――――――――
console.groupCollapsed('switch 예제');
var today = new Date();
var weekday = today.getDay();
var weekdays = "일월화수목금토";

var printDay = function(day){
    validateError(day,"!string","문자열이 아닙니다.");
}

switch (isEven(weekday)) {
    case 'odd':
        console.log('월/수/금은 시간이 됩니다.');
        break;
    case 'even':
        console.log('월/수/금 외에는 시간이 안됩니다.');
        break;
    default:
        console.warn('존재하지 않는 요일입니다.');
        break;
}
console.groupEnd('switch 예제');

// ―――――――――――――――――――――――――――――――――
// 3항 연산 조건문 예제 
// ―――――――――――――――――――――――――――――――――
console.groupCollapsed('3항 연산 조건문');
    var result_message = isType(weekday, 'string') ?
     'weekday is String' : 'weekday isn\'t String';
    console.log('result_message : ',result_message);

    var today_is = null;
    if (isType(today,'date')) { today_is = 'Date Object';}
    else { today_is = 'Not Date Object'; }
    console.log('today_is : ',today_is);

console.log('%c-------------------------------','color: #f00;');

    var current_year = today.getFullYear();
    var current_year_is = null;
    var _type = type(current_year);
    // switch 문의 대체
    current_year_is =
        (_type === 'number') ?
            'This is Number Type' :
            (_type === 'string') ?
                'This is String Type' :
                (_type === 'boolean') ?
                    'This is Boolean Type' :
                    (_type === 'function') ?
                        'This is Function Type' :
                        (_type === 'array') ?
                            'This is Array Type' :
                            (_type === 'object') ?
                                'This is Object Type' :
                                'This is not Number, String, Boolean, Function, Array Object Type.';
    console.log('current_year_is : ',current_year_is);
console.groupEnd('3항 연산 조건문');

// ---------------------------------------
// try/catch/throw
console.groupCollapsed('try/catch/finally');
try {
    var last_weekday = weekdays.pop(); //  String 객체에 Array function 사용 => ERR!!
    console.log('last_weekday : ',last_weekday);
} catch(error){
    console.error(error.message);
    // throw error.message;    // throw 후 statement는 실행되지 않음
    // last_weekday = weekdays[weekdays.length-1];
    // console.log('last_weekday : ',last_weekday);
}
console.groupEnd('try/catch/finally');


// ——————————————————————————————————————
// 반복문
// ——————————————————————————————————————
// ---------------------------------------
// break/continue

// ---------------------------------------
// while
console.groupCollapsed('while 문');
var k = 9;
while ( k > 0 ) {
    // if( k < 6 ){ break; }
    if( k === 5 ) { 
        k -= 2;
        continue; 
    }
    console.log('k : ',k);
    k -= 2;
}
var math = Math;
var while_cnt = 0;
while( isType(math, 'math')){
    console.log('Math is 수학 객체');
    if (while_cnt++ > 4) { 
        math = new Error(); break; 
    }
}
console.groupEnd('while 문');
console.groupCollapsed('do while 문');
// ---------------------------------------
// do...while
var data_collection = [ null, {}, 9, '집합', false, [], function(){{}} ];
var n = data_collection.length;
do {
    console.log('type(data_collection[',--n,']) : ',type(data_collection[n]));
} while (!isType(data_collection[n],'function'));
console.groupEnd('do while 문');

// data.js의 데이터 중 학교정보가 없는 사람을 제외
console.group('Data.js 데이터 순환 필터링');
var filteredClassMate = [];
var classmate, len = classUsingArray.length;

while (len--) {
    classmate = classUsingArray[len];
    if ( !isType(classmate.school,'null') ){
        filteredClassMate.push(classmate);
    }
}
console.groupEnd('Data.js 데이터 순환 필터링');
// ---------------------------------------
// for
console.groupCollapsed('data.js 데이터 순환 필터링 FOR문');
console.time('for문 : 통상적인 for문');
var filteredClassMateFor = [];
for (var i=0, l=classUsingArray.length; i < l; i++ ){
    classmate = classUsingArray[i];
    if ( !isType(classmate.school,'null') ){
        filteredClassMateFor.push(classmate);
    }
}
console.timeEnd('for문 : 통상적인 for문');
console.log('%c-------------------------------','color: #f00;');
console.time('for문 : 변칙적인 for문');
var filteredClassMateFor = [];
for (var i=classUsingArray.legnth; classmate = classUsingArray[--i]; ){
    if ( !isType(classmate.school,'null') ){
        filteredClassMateFor.push(classmate);
    }
}
console.timeEnd('for문 : 변칙적인 for문');
console.groupEnd('data.js 데이터 순환 필터링 FOR문');
// ---------------------------------------
// for...in

console.groupCollapsed('length를 갖지 않는 Object 순환을 위한 for in');
// var han = classUsingObject.한진아;
// for ( var prop in han ){
//     if (han.hasOwnProperty(prop)){  // 상속받은 속성은 제외
//         console.log('han 객체의 속성 : ',prop);
//         console.log('han 객체의 값 : ',han[prop]);
//     }
// }

console.time('prop in object');
for( var member in classUsingObject){
    // if (isType(classUsingObject[member],'object')){
    //     for (var prop in classUsingArray[member]){
            
    //     }
    // }
    if (classUsingObject.hasOwnProperty(member)){
        console.log('member : ',member);
    }
}
console.timeEnd('prop in object');

console.groupEnd('length를 갖지 않는 Object 순환을 위한 for in');


var parent = {
    name : '김훈남',
    age : 42,
    job: '농부',
    drive: function(mobil){
        mobile = mobile || '경운기';
        return this.job + '인 ' + this.name + '씨가 ' + mobil + '을(를) 타고 드라이브 합니다.';
    }
};

var child = Object.create(parent);
child.game_console  = 'Sony Playstation 4';
child.friends = ['가','나','다'];


console.group('hasOwnProperty() 를 사용하지 않은 경우');
for( var prop in child){
        console.log('prop : ',prop);
}
console.groupEnd('hasOwnProperty() 를 사용하지 않은 경우');
console.group('hasOwnProperty() 를 사용하는 경우');
for( var prop in child){
    if( child.hasOwnProperty(prop)){
        console.log('prop : ',prop);
    }
}
console.groupEnd('hasOwnProperty() 를 사용하는 경우');

