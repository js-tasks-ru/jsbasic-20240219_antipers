function filterRange(arr, a, b) {
  if (a < b) { // для работы функции в обе стороны  (от 1 до 4) и (от 4 до 1)
    hiddenFilter(arr, a, b);
    return filtered
  } else {
    let temp = a;
    a = b;
    b = temp;
    hiddenFilter(arr, a, b);
    return filtered
  }
}

function hiddenFilter(arr, a, b) {
  filtered = arr.filter((userObj) => {
    if ((userObj >= a) && (userObj <= b)) {
      return userObj
    }
  })
}

let arr = [5, 3, 8, 1];

filterRange(arr, 1, 4);
console.log(filtered); // [3,1] (совпадающие значения)
console.log(arr); // [5,3,8,1] (без изменений)



//старый вариант, который был написан до 3 занятия
// function filterRange(arr, a, b) {
//   for (let i = 0; i < arr.length; i++) {
//     if ((arr[i] >= a) && (arr[i] <= b)) {
//       filtered.push(arr[i])
//     }
//   }
//   return filtered;
// }