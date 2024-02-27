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




let schedule = {};
console.log('пусто ' + isEmpty(schedule))
schedule["action"] = "подъём";;
console.log('завели ' + schedule["action"])
console.log('вернули key ' + isEmpty(schedule))



// console.log('должно быть TRUE ' + isEmpty(schedule))

// schedule["8:30"] = "подъём";

// console.log('должно быть FALSE ' + isEmpty(schedule))

// let user = { name: "John", age: 30 };

// console.log("key" in user );