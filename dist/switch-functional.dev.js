"use strict";

// 2. 외부 다형성
//  1. array_like, arguments, sdocument.querySelectorAll
[1, 2, 3, 4].map(function (val) {
  return val * 2;
});
[1, 2, 3, 4].filter(function (val) {
  return val % 2;
}); // 기존 js에도 map과 filter함수가 있다
// 정확히는 함수가 아니라 메소드이다
// 메소드는 순수함수가 아니고 객체지향 프로그래밍이다
// 객체에 상태에 따라 결과가 달라지는 특징이있다
// 평가 순서에 따른 차이점 (객체지향 - 함수형)
// 데이터가 먼저 나오는 프로그래밍 ([1, 2, 3, 4])
// 데이터가 있어야 메소드(map)가 생긴다
// -> 객체([])가 있어야 기능(map)을 수행한다 : 객체 지향
// 메소드의 특징
// 해당 클래스에 정의되기 때문에
// 해당클래스의 인스턴스에만 사용할 수 있다.
// ex) map은 배열이 아니면 사용할 수 없다.

document.querySelector("*").map(function (node) {
  return node.name;
}); // 해당 구문은 오류
// querySelector이 반환하는 값이 배열이 아니기 때문에(NodeList) map을 사용할 수 없다
// -> 메소드의 특징: 해당하는 클래스의 준비되지 않은 메소드는 사용할 수 없다
// 자료형에 따라 사용하기가 어렵다 -> 다형성이 낮다
// 함수가 기준이되는 함수형 프로그래밍

_map(document.querySelector("*"), function (node) {
  return node.name;
}); // 평가 순서에 따른 차이점 (객체지향 - 함수형)
// 함수가 먼저 존재(_map)
// 데이터(document.querySelector("*"))가 생기지 않더라도 함수 자체가 먼저 존재하기 때문에
// 평가 시점이 상대적으로 훨씬 유연하다
// 3. 내부 다형성
// 1. predi, iter, mapper (보조함수)


_map([1, 2, 3, 4], function (v) {
  return v + 10;
}); // 두 번째 인자는 콜백함수로 부르는 경향이 있다
// 함수형프로그래밍에서는 두번째 인자의 역할에 따라 다양한 이름을 가진다
// 콜백함수는 특정 작업이 끝난후 실행된다
// prei, iter, mapper는 각 역할이 다르다
// 조건 리턴, 돌면서 반복 실행, 어떤 것을 매핑시키는 함수 -> 보조 함수의 이름을 다르게 부른다