"use strict";

const arr = [23, 45, 56];

let myFunc = a => {
  console.log("Too : ".concat(a));
};

const arr2 = [...arr, 444, 555];
myFunc(arr2);