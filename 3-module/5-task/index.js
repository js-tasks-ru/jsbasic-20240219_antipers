function getMinMax(str) {
  splitArr = str.split(' ');
  numArr = splitArr.filter((userObj) => {
    if (Number.isFinite(+userObj)) {
      return userObj
    }
  });
  result.min = Math.min(...numArr)
  result.max = Math.max(...numArr)  
console.log(`min: ${result.min}, max: ${result.max}`)  
}


const inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';
let splitArr = [];
let numArr = [];
let result = {};
getMinMax(inputData);