function makeFriendsList(friends) {
     document.body.insertAdjacentHTML('afterBegin', `<ul class="list">Список друзей </ul>`);
    let list = document.querySelector('.list');
for (friend of friends){
    list.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`);
}
}
