function isEmpty(obj) {
  for (let key in obj) {
    if (key in obj) {
      console.log("key- "+key)
      console.log("obj[key]- "+obj[key])
      return false;
    }
  }
  return true
}
