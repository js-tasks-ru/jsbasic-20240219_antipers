function showSalary(users, age) {
  let names = users
    .filter((userObj) => {
      return userObj.age <= age
    })
    .map((userObj) => {
      return `${userObj["name"]}, ${userObj["balance"]}`
    })
    .join('\n');
  return names;
}
