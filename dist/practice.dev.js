"use strict";

var users = [{
  id: 1,
  name: "ID",
  age: 36
}, {
  id: 2,
  name: "BJ",
  age: 32
}, {
  id: 3,
  name: "JM",
  age: 32
}, {
  id: 4,
  name: "PG",
  age: 27
}, {
  id: 5,
  name: "HA",
  age: 25
}, {
  id: 6,
  name: "JE",
  age: 26
}, {
  id: 7,
  name: "JI",
  age: 31
}, {
  id: 8,
  name: "WP",
  age: 23
}]; // 1. 명령형 코드
// 1. 30세 이상인 users

var older_users = [];

for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    older_users.push(users[i]);
  }
}

console.log(older_users); // 2. 30세 이상인 users의 names 수집

var names = [];

for (var _i = 0; _i < older_users.length; _i++) {
  names.push(older_users[_i].name);
}

console.log(names); // 3. 30세 미만인 users

var young_users = [];

for (var _i2 = 0; _i2 < users.length; _i2++) {
  if (users[_i2].age < 30) {
    young_users.push(users[_i2]);
  }
}

console.log(young_users); // 4. 30세 미만인 users의 age를 수집

var ages = [];

for (var _i3 = 0; _i3 < young_users.length; _i3++) {
  ages.push(young_users[_i3].age);
}

console.log(ages); // 2. _filter, _map으로 리팩토링

function _filter(users, predi) {
  var new_list = [];

  for (var _i4 = 0; _i4 < users.length; _i4++) {
    if (predi(users[_i4])) {
      new_list.push(users[_i4]);
    }
  }

  return new_list;
}

console.log(_filter(users, function (user) {
  return user.age >= 30;
}));
console.log(_filter(users, function (user) {
  return user.age < 30;
})); // 응용형 함수, 응용형 프로그래밍, 적용형 프로그래밍
// 함수가 함수를 인자로 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하는 것
//고차 함수
// 함수를 인자로 받거나, 함수를 리턴하거나, 함수를 인자로 받아서 실행시키는 것

console.log(_filter([1, 2, 3, 4], function (num) {
  return num % 2;
}));
console.log(_filter([1, 2, 3, 4], function (num) {
  return !(num % 2);
})); // 필터는 user만을 위한 함수가 아니라 모든 배열을 필터링 할 수 있는 함수
// 사용자가 어떤 배열을 넘기는지 알고 있고
// 그 규격에 맞는 또다른 순수함수(보조함수)를 predicate 함수로 넘겨주기 떄문에
// 어떤 값이 들어있는 배열이든 필터링이 가능하다
// 다형성, 재활용성이 높은 함수

function _map(list, mapper) {
  var new_list = [];

  for (var _i5 = 0; _i5 < list.length; _i5++) {
    new_list.push(mapper(list[_i5]));
  }

  return new_list;
} // 무엇을 new_list에 push할 것인지 mapper에게 위임


var over_30 = _filter(users, function (user) {
  return user.age >= 30;
});

console.log(over_30);

var over_30_names = _map(over_30, function (user) {
  return user.name;
});

console.log(over_30_names);

var under_30 = _filter(users, function (user) {
  return user.age < 30;
});

console.log(under_30);

var under_30_ages = _map(under_30, function (user) {
  return user.age;
});

console.log(under_30_ages); // 함수형프로그래밍에서는 대입문을 많이 사용하지 않는 경향이있다
// 함수형 프로그래밍은 값을 만들어놓고 변형해나가는 것이 아니라
// 함수를 통과해나가면서 한 번에 값을 새로 만들어나가는 것

console.log(_map(_filter(users, function (user) {
  return user.age >= 30;
}), function (user) {
  return user.name;
}));
console.log(_map(_filter(users, function (user) {
  return user.age < 30;
}), function (user) {
  return user.age;
})); // 위의 코드 리팩토링
// 대입문이 없으면 간결한 코드를 만들수 있다
// 중간에 변화를 줄 수 있는 여지가 없어진다
// ex) over_30.pop()
// -> 안정성이 높으며 테스트가 용이하다