// RED - GLOBAL SCOPE (1)
var colors = ["red", "green", "blue", "salmon", "yellow", "orange", "turquoise"];
const budget = 350;

var product = {
  getId: function generateId() {
    return Math.floor(Math.random() * 100);
  },
  getPrice: function generatePrice() {
    return Math.floor(Math.random() * 150);
  },
};

var products = generateProducts(100);
var bought = buy();

function generateProducts(amount) {
  // GREEN - FUNCTION SCOPE (2)
  var products = [];

  for (let i = 0; i < amount; i++) {
    // BLUE - BLOCK SCOPE (3)
    let item = Object.create(product);
    item.id = item.getId();
    item.price = item.getPrice();
    item.color = colors[Math.trunc(1e9 * Math.random()) % colors.length];
    item.isInStock = Boolean(Math.floor(Math.round(Math.random())));

    products.push(item);
  }

  return products;
}

function buy() {
  // YELLOW - FUNCTION SCOPE (4)
  var boughtItems = [];
  var total = 0;
  var selected = products.filter(function keepInterestingProducts(product) {
    // ORANGE - FUNCTION SCOPE (5)
    return product.isInStock && product.price > 15 && product.price < 75 && product.id % 3 === 0;
  });

  for (let product of selected) {
    // TURQUOISE - BLOCK SCOPE (6)
    if ((product.color === "turqoise" || product.color === "red") && total <= budget) {
      // SALMON - BLOCK SCOPE (7)
      boughtItems.push(product);
      total += product.price;
    }
  }

  return boughtItems;
}
