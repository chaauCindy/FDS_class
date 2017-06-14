/**
 * JavaScript 데이터 유형을 완벽하게 문자열로 반환하는 유틸리티 함수
 * 
 * @param   {any}       data    - JavaScript 모든 데이터 유형
 * @returns {String}            - 데이터 유형 이름을 소문자 문자열로 반환
 */
function type(obj){
  return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
/**
 * 전달된 데이터 유형과 타입 문자열의 일치여부를 반환하는 유틸리티 함수
 * 
 * @param   {any}       data        - 타입을 판단하고자 하는 데이터
 * @param   {String}    kind        - 데이터 타입 소문자 문자열
 * @returns {Boolean}               - true/false
 */
function isType(data, kind){
  validateError(kind, '!string','2번째 인자는 문자열이 전달되어야 합니다.');
  return type(data) === kind;
}
/**
 * 데이터 유형이 (불)일치할 경우 throw 메시지를 출력
 * 
 * @param {any}    data    - 유형을 판단할 데이터
 * @param {String} kind    - 소문자 데이터 타입 : !String or String
 * @param {String} message - [opt]throw 출력 문구
 */
function validateError(data, kind, message){
  data = type(data);
  if (kind.indexOf('!') > -1){
      if(data !== kind.slice(1)){ throw message || '두 값이 일치하지 않습니다.'; }
  } else {
      if(data === kind){ throw message || '두 값은 일치하지 않아야 합니다.'; } 
  }
  return '오류는 발생하지 않았습니다.';
}
/**
 * 숫자 범위 안의 랜덤 값을 반환하는 함수
 * 
 * @param {Number} num1 랜덤 값의 최대/최소 값
 * @param {Number} num2 랜덤 값의 범위 설정 (default : 0)
 * @returns min ~ max 의 랜덤값, 값이 없을 경우 0또는 1 반환
 */
function getRnd(num1, num2){
  var min = Math.min(num1 || 2, num2 || 0);
  var max = Math.max(num1 || 2, num2 || 0);
  return Math.round( Math.random() * (max - min)) + min;
}
/**
 * 숫자형 요일 데이터를 받아와 한글로 요일을 반환하는 함수
 * 
 * @param {Number} day 0~6 사이의 숫자형 요일 값
 * @returns 한글로 변환한 요일 값
 */
function getDayString(day){
  validateError(day,"!number","인자값은 숫자형이어야 합니다.");
  if(!(/[0-6]/.test(day))) { throw "인자값은 0~6 사이의 숫자이어야 합니다."}
  var weekdays = "일월화수목금토";
  for(var i=0; i < weekdays.length; i++){
    if(day === i){ return weekdays[i] + '요일'; }
  }
}
/**
 *  숫자형 날짜를 받아와 한글로 출력하는 함수
 * 
 * @param {Number} date  1~31 내의 숫자
 */
function getDateString(date){
  validateError(date,'!number','인자값은 숫자형이어야 합니다.');
  if (date < 1 || date > 31) { throw '인자값은 1~31 사이의 숫자이어야 합니다.';}
  var result = '';
  var strDays = ['','일','이','삼','사','오','육','칠','팔','구'];
  // ―――――――――――――――――――――――――――――――――
  // 문자를 배열에 넣은 후 숫자의 자릿수만큼 for문으로 변환
  // ―――――――――――――――――――――――――――――――――
  date = date.toString();
  var len = date.length;
  for(var i=--len; i > -1; i--){
    i == len ?
      result = strDays[date[i]] + '일' :
      result = strDays[date[i]] + '십' + result ;
  }
  return result;
}


/**
 * 타입을 검증하는 함수.
 * function명에 해당하는 객체 타입인지 검증한다.
 * @func is[DATA_TYPE]
 * @param {any} data 
 * @returns {Boolean} true/false
 */
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

/**
 * 전달받은 객체를 값 복사하여 배열로 반환한다.
 * 
 * @param {any} o - argument, NodeList 와 같은 유사배열 객체
 * @returns {Array}
 */
function convertArray(o){
  return Array.prototype.slice.call(o);  
}



// 1. 두 수를 입력받아 큰 수를 반환하는 함수 function
function max (a, b){
  return a > b ? a : b;
}
// 2. 숫자를 입력하면 요일을 반환하는 함수
function day(num){
  var week = "일월화수목금토";
  return week[num%7];
}
// 3. 짝수 홀수 판단하는 함수
function isEven(num){
  return num % 2 === 0 ? 'even' : 'odd';
}
// 4. 숫자를 배열로 전달받아 숫자들의 평균을 반환하는 함수
function avg(numArr){
  var result = 0;
  for(var i = 0, l = numArr.length; i < l; i ++){
    result += numArr[i];
  }
  return result / numArr.length;
  // numArr.forEach(function(item) {
  //   result += item;
  // });
  // return result / numArr.length;
}
// 5. 문자를 배열로 전달 받아 문자열 하나로 반환하는 함수
function oneString(strArr){
  return strArr.join('');
}
// 6. 세 수를 입력받아 큰 수를 반환하는 함수
function max3(a, b, c){
  return max(max(a, b), max(b,c));
}
// n개의 인자를 받아서 가장 큰 수를 반환
function maxn(...n){
  var max = n[0];
  for(var i = 1, l = n.length; i < l ; i++){
    if( max < n[i] ){
      max = n[i];
    }
  }
  return max;
}
// 7. 전화번호를 입력하면 뒤에 4자리를 제외하고 *로 바꾸는 함수
function maskPhoneNum(phoneNum){
  // var result = '';
  // for(var i = 0, l = phoneNum.length; i < l; i ++){
  //   if(l - i > 4){
  //     result += '*'
  //   } else {
  //     result += phoneNum[i];
  //   }
  // }
  // return result;
  return phoneNum.replace(/[0-9](?=[0-9]{4})/g, '*')
}
// 8. Email validation
function validateEmail (email){
  return email.indexOf('@') !== -1;
}
// 9. 비밀번호 문자열 validation 영어문자 숫자 포함 8~20자리수
function validatePassword(pw){
  // var lowCase = 'abcdefghijklmnopqrstuvwxyz';
  // var upCase = lowCase.toUpperCase();
  // var numCase = '0123456789';
  // var lowCheck = false;
  // var upCheck = false;
  // var numCheck = false;
  // if (pw.length >= 8){
  //   for(var i = 0, l = lowCase.length; i < l; i++){
  //     if (pw.indexOf(lowCase[i]) !== -1){
  //       lowCheck = true;
  //     }
  //     if (pw.indexOf(upCase[i]) !== -1){
  //       upCheck = true;
  //     }
  //   }
  //   for(var i = 0, l = numCase.length; i < l; i++){
  //     if (pw.indexOf(numCase[i]) !== -1){
  //       numCheck = true;
  //     }
  //   }
  // }
  // if( lowCheck && upCheck && numCheck){
  //   return true;
  // } else {
  //   return false;
  // }
  return /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/.test(pw);
}




















// function findDay(num){

// }
// function isEven(n){

// }
// function average(numArr){

// }
// function oneString(strArr){

// }
// function maxThree(a, b, c){

// }
// function convertPhoneNum(phoneNum){

// }
// function validateEmail(email){

// }
// function validatePassword(pw){

// }