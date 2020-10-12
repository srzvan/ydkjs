let product = {
  getId: function generateId() {
    return Math.floor(Math.random() * 100);
  },
};

function generateProducts(amount) {
  var products = [];

  for (let i = 0; i < amount; i++) {
    products.push(createItem());
  }

  return products;

  function createItem() {
    let item = Object.create(product);
    item.id = item.getId();

    return item;
  }
}

let products = generateProducts(100);

console.log(products);
