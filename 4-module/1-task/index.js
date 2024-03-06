function makeFriendsList(friends) {
    let list = document.createElement('UL');
    for (friend of friends) {
        list.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`);
    }
    return list
}
