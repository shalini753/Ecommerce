
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("productDetail");
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(function (item) {
        return item.id === productId;
    });

    if (!product) {
        container.textContent = "Product not found.";
        return;
    }

    container.innerHTML = `
        <div class="detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="detail-info">
            <p>${product.category}</p>
            <h1>${product.name}</h1>
            <p class="detail-price">₹${product.price}</p>

            <p class="detail-description">
                A practical everyday choice from ShopEase.
                Designed to offer comfort, convenience and value.
            </p>

            <label class="quantity-label">
                Quantity
                <input type="number" id="detailQuantity"
                       min="1" max="10" value="1">
            </label>

            <button id="detailAddButton" class="primary-btn">
                Add to Cart
            </button>

            <p id="detailMessage" class="form-message"></p>
        </div>
    `;

    document.getElementById("detailAddButton")
        .addEventListener("click", function () {

            const quantity = Math.max(1, Math.min(10,
                Number(document.getElementById("detailQuantity").value) || 1
            ));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.id === product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            if (typeof updateCartCount === "function") {
                updateCartCount();
            }

            document.getElementById("detailMessage").textContent =
                "Product added to cart successfully!";
        });

});
