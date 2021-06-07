"use strict";

// 함수형 프로그래밍
// 성공적인 프로그래밍을 위해 부수효과를 미워하고
// 조합성을 강조하는 프로그래밍 패러다임
// 부수 효과를 미워한다 -> 순수함수를 만든다 
// => 오류를 줄이고 안정성을 높인다
// 조합성을 강조한다 -> 모듈화 수준을 높인다 
// => 생산성을 높인다
// 순수함수
function add(a, b) {
  return a + b;
}

console.log(add(10, 5)); // 15
// 순수 함수인 이유
// 1. 동일한 인자를 주면 동일한 결과를 반환한다
// 2. 부수효과가 없다.
// (부수효과: 함수가 리턴값으로 결과를 반환하는 것외에 외부의 상태에 영향을 미치는 것)
// =====> 순수함수가 아닌 케이스
// 1. 동일한 인자를 줬을 때 상황에 따라 다른 결과를 반환하는 함수

var c = 10;

function add2(a, b) {
  return a + b + c;
} // 변수 c가 변경되면 add2 함수는 순수함수가 아니다.
// 변수 c가 상수로써 존재한다면 add2는 순수함수다.


console.log(add2(10, 2)); // 22

c = 20;
console.log(add2(10, 2)); // 32
// 즉, 위와 같이 c에 값에 따라 결과값이 달라지면 순수함수가 아니다.
// 2. 부수효과를 일으키는 함수
// 외부의 상태에 영향을 미치거나 인자값에 직접적인 영향을 미치는 함수

var d = 20;

function add3(a, b) {
  d = b; // 외부의 상태에 영향을 미침

  return a + b;
}

console.log("d: ".concat(d)); // d: 20

add3(20, 30);
console.log("d: ".concat(d)); // d: 30

var obj1 = {
  val: 10
};

function add4(obj, b) {
  obj.val += b;
}

console.log(obj1.val); // 10

add4(obj1, 20);
console.log(obj1.val); // 30
// 기존 값을 복사하여 원하는 부분만 업데이트된 새로운 값을 리턴

var obj2 = {
  val: 10
};

function add5(obj, b) {
  return {
    val: obj.val + b
  };
} // 인자의 값을 직접 변경하지 않고


console.log(obj2.val); // 10

var obj3 = add5(obj2, 20);
console.log(obj2.val); // 10

console.log(obj3.val); // 30