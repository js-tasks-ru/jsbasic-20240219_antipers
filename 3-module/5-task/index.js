function getMinMax(str) {
  let splitArr = str.split(' ')
    .filter((userObj) => {
      if (Number.isFinite(+userObj)) {
        return userObj
      }
    });
    let result = {};
  result.min = Math.min(...splitArr)
  result.max = Math.max(...splitArr)
  return result
}
const inputData = '1 и -5.8 или 10 хотя 34 + -5.3 и 73';



