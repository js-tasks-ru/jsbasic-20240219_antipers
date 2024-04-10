export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    this.product = product
    console.log(this.product);
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

    console.log(this.cartItems);

    this.getTotalCount();
    this.getTotalPrice();
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    this.cartItems.find((n) => n.product.id === productId).count += amount;
    if (this.cartItems.find((n) => n.product.id === productId).count == 0) {
      let toDel = this.cartItems.indexOf(this.cartItems.find((n) => n.product.id === productId));
      this.cartItems.splice(toDel, 1);
    }
    this.getTotalCount();
    this.getTotalPrice();
  }

  isEmpty() {
    for (let item of this.cartItems) {
      return false
    }
    return true
  }

  getTotalCount() {
    let totalCount = 0
    for (let oneCount of this.cartItems) {
      totalCount += oneCount.count;
      console.log(totalCount);
    }

  }

  getTotalPrice() {
    console.log('getTotalPrice');
    let totalPrices = 0
    for (let onePrice of this.cartItems) {
      totalPrices += (onePrice.product.price) * onePrice.count;
      console.log(totalPrices);
    }

  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче


    this.cartIcon.update(this);
  }
}

