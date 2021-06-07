// import { _map, _filter } from "./_";
const { _map, _filter } = require("./_");

// 3. 커링
// 함수와 인자를 다루는 기법
// 함수에 인자를 하나씩 적용해나가다가
// 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법
// js에서는 커링이 지원되지 않지만
// 일급함수가 지원되고 평가시점을 다룰수 있기 때문에 커링같은 기법을 구현할수있다

//  1. _curry, _curryr
function _curry(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

// 인자로 본체함수를 받는다
// 커리함수를 실행하면 즉시실행함수를 리턴한다

const add = _curry((a, b) => a + b);
const add10 = add(10);
const add5 = add(5);

console.log(add10(5));
console.log(add(5)(3));
console.log(add5(3));
console.log(add(10)(3));
console.log(add(1, 2));

const sub = _curryr((a, b) => a - b);

console.log(sub(10, 5));

const sub10 = sub(10);
console.log(sub10(5));

//  2._get 만들어 좀 더 간단하게 하기
// 객체에 있는 값을 안전하게 참조하는 함수

// function _get(obj, key) {
//   return obj == null ? undefined : obj[key];
// }
const _get = _curryr((obj, key) => (obj == null ? undefined : obj[key]));

const users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PG", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "WP", age: 23 },
];

const user1 = users[0];
console.log(user1.name); // ID
console.log(_get(user1, "name")); // ID

// console.log(users[10].name);
// error
console.log(_get(users[10], "name")); // undefined

console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    _get("name")
  )
);

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    _get("age")
  )
);
