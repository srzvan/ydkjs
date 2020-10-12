let product = {
  getId: function generateId() {
    return Math.floor(Math.random() * 100);
  },
};

function generateProducts(amount) {
  var products = [];

  for (let i = 0; i < amount; i++) {
    let item = Object.create(product);
    item.id = item.generateId();

    products.push(item);
  }

  return products;
}

let products = generateProducts(100);

console.log(products);
