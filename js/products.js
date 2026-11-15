
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Classic Backpack",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Modern Table Lamp",
        category: "Home & Living",
        price: 799,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"
    },
    {
        id: 6,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 7,
        name: "Sunglasses",
        category: "Accessories",
        price: 699,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 8,
        name: "Coffee Maker",
        category: "Home & Living",
        price: 2999,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
    }
];

// DISPLAY PRODUCTS

const productContainer = document.getElementById("productContainer");

function displayProducts(productList) {

    productContainer.innerHTML = "";

    document.getElementById("noProducts").hidden =
        productList.length !== 0;

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button class="add-cart-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);

    });
}

// SEARCH PRODUCTS

document.getElementById("searchInput")
.addEventListener("input", filterProducts);

// CATEGORY FILTER

document.getElementById("categoryFilter")
.addEventListener("change", filterProducts);

// SORT PRODUCTS

document.getElementById("sortFilter")
.addEventListener("change", filterProducts);

function filterProducts() {

    const searchValue =
        document.getElementById("searchInput")
        .value.toLowerCase();

    const categoryValue =
        document.getElementById("categoryFilter").value;

    const sortValue =
        document.getElementById("sortFilter").value;

    let filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue);

        const matchesCategory =
            categoryValue === "all" ||
            product.category === categoryValue;

        return matchesSearch && matchesCategory;

    });

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    else if (sortValue === "name") {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    displayProducts(filteredProducts);
}

// ADD TO CART

function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart!");
}

// UPDATE CART COUNT

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}

// INITIALIZE

displayProducts(products);
updateCartCount();
