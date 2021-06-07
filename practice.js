const { _each, _curryr, _get } = require("./_");

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

// 1. 명령형 코드

// 1. 30세 이상인 users
const older_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    older_users.push(users[i]);
  }
}
console.log(older_users);

// 2. 30세 이상인 users의 names 수집
const names = [];
for (let i = 0; i < older_users.length; i++) {
  names.push(older_users[i].name);
}
console.log(names);

// 3. 30세 미만인 users
const young_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    young_users.push(users[i]);
  }
}
console.log(young_users);

// 4. 30세 미만인 users의 age를 수집
const ages = [];
for (let i = 0; i < young_users.length; i++) {
  ages.push(young_users[i].age);
}
console.log(ages);

// 2. _filter, _map으로 리팩토링
function _filter(users, predi) {
  const new_list = [];
  for (let i = 0; i < users.length; i++) {
    if (predi(users[i])) {
      new_list.push(users[i]);
    }
  }
  return new_list;
}

console.log(_filter(users, (user) => user.age >= 30));
console.log(_filter(users, (user) => user.age < 30));

// 응용형 함수, 응용형 프로그래밍, 적용형 프로그래밍
// 함수가 함수를 인자로 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하는 것

//고차 함수
// 함수를 인자로 받거나, 함수를 리턴하거나, 함수를 인자로 받아서 실행시키는 것

console.log(_filter([1, 2, 3, 4], (num) => num % 2));
console.log(_filter([1, 2, 3, 4], (num) => !(num % 2)));
// 필터는 user만을 위한 함수가 아니라 모든 배열을 필터링 할 수 있는 함수
// 사용자가 어떤 배열을 넘기는지 알고 있고
// 그 규격에 맞는 또다른 순수함수(보조함수)를 predicate 함수로 넘겨주기 떄문에
// 어떤 값이 들어있는 배열이든 필터링이 가능하다
// 다형성, 재활용성이 높은 함수

function _map(list, mapper) {
  const new_list = [];
  for (let i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

// 무엇을 new_list에 push할 것인지 mapper에게 위임

const over_30 = _filter(users, (user) => user.age >= 30);
console.log(over_30);
const over_30_names = _map(over_30, (user) => user.name);
console.log(over_30_names);

const under_30 = _filter(users, (user) => user.age < 30);
console.log(under_30);
const under_30_ages = _map(under_30, (user) => user.age);
console.log(under_30_ages);

// 함수형프로그래밍에서는 대입문을 많이 사용하지 않는 경향이있다
// 함수형 프로그래밍은 값을 만들어놓고 변형해나가는 것이 아니라
// 함수를 통과해나가면서 한 번에 값을 새로 만들어나가는 것

console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    (user) => user.name
  )
);

console.log(
  _map(
    _filter(users, (user) => user.age < 30),
    (user) => user.age
  )
);
// 위의 코드 리팩토링
// 대입문이 없으면 간결한 코드를 만들수 있다
// 중간에 변화를 줄 수 있는 여지가 없어진다
// ex) over_30.pop()
// -> 안정성이 높으며 테스트가 용이하다

// 4. _reduce 만들기
const slice = Array.prototype.slice;

function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, (val) => (memo = iter(memo, val)));
  return memo;
}

_reduce([1, 2, 3], (a, b) => a + b, 0);
// 6

function add(a, b) {
  return a + b;
}

// 동작 과정
// _reduce([1, 2, 3], add, 0);
// memo = add(0, 1);
// memo = add(memo, 2);
// memo = add(memo, 3);
// return memo;

// add(add(add(0, 1), 2), 3);
// 리듀스는 재귀적으로 iter함수를 실행해서 결과값을 만드는 함수

console.log(_reduce([1, 2, 3], add, 10));
// 16

console.log(_reduce([1, 2, 3], add));
// 6

function _go(arg) {
  const fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}
// go는 pipe의 즉시 실행 버전

// 5. 파이프라인 만들기
//  1. _pipe

function _pipe() {
  const fns = arguments;
  return function (arg) {
    return _reduce(fns, (arg, fn) => fn(arg), arg);
  };
}

// 함수를 인자로 받아서 연속적으로 실행시키는 함수
// 함수를 리턴하는 함수

const f1 = _pipe(
  (a) => a + 1, // 1+1
  (a) => a * 2, // 2*2
  (a) => a * a
);

console.log(f1(1));
// 16

// 2. _go
// 즉시 실행되는 파이프 함수

_go(
  1,
  (a) => a + 1, // 1+1
  (a) => a * 2, // 2*2
  (a) => a * a,
  console.log
);
// 16

// 3. users에 _go 적용
console.log(
  _map(
    _filter(users, (user) => user.age >= 30),
    _get("name")
  )
);

_go(
  users,
  _filter((user) => user.age >= 30),
  _map(_get("name")),
  console.log
);
