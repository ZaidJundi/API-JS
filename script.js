const productContainer = document.getElementById("product-container");
const totalElement = document.getElementById("total"); // إضافة عنصر لعرض المجموع
let total = 0; // متغير لتخزين المجموع الإجمالي

fetch("https://fakestoreapi.com/products/categories")
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(products => {
          displayProducts(products);
        });
    });
  });

// Display products on the page
function displayProducts(products) {
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price}</p>
      <button class="view-details-button" onclick="showDetails('${product.title}', '${product.description}', ${product.price})">View Details</button>
    `;

    productContainer.appendChild(productCard);
  });
}

function showDetails(title, description, price) {
  total += price; // زيادة المجموع بسعر المنتج
  totalElement.textContent = `Total: $${total}`; // عرض المجموع
  alert(`Product: ${title}\nDescription: ${description}\nPrice: $${price}`);
}
