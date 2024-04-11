export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) { return }
    let temp = {
      product: product,
      count: 1,
    }

    let cartItem = this.cartItems.find((n) => n.product.id === product.id);
    if (cartItem) {
      cartItem.count += 1;
    } else {
      this.cartItems.push(temp)
    }
    this.onProductUpdate(cartItem)
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((n) => n.product.id === productId)
    cartItem.count += amount;
    if (cartItem.count <= 0) {
      let toDelIndex = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(toDelIndex, 1);
    }
    this.onProductUpdate(cartItem)
  }

  isEmpty() {
    for (let item of this.cartItems) {
      return false
    }
    return true
  }

  getTotalCount() {
    /* 
    почему-то не проходит проверку, хотя в консоли считает правильно
    let totalCount = 0
    for (let oneCount of this.cartItems) {
      totalCount += oneCount.count;
      console.log(totalCount);
      return totalCount
    } 
    */
    return this.cartItems.reduce((totalCount, currentCount) => totalCount + currentCount.count,
      0
    )
  }

  getTotalPrice() {
    /*почему-то не проходит проверку, хотя в консоли считает правильно
      let totalPrices = 0
     for (let onePrice of this.cartItems) {
       totalPrices += (onePrice.product.price * onePrice.count);
       return totalPrices
     } */
    return this.cartItems.reduce((totalPrices, currentPrice) => totalPrices + (currentPrice.product.price * currentPrice.count),
      0
    )
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);
  }
}

