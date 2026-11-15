
function renderCartPage() {

    const root = document.getElementById("cartPage");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        root.innerHTML = `
            <div class="empty-state">
                <h2>Your cart is empty</h2>
                <p>Start shopping to add products.</p>
                <a href="products.html" class="primary-btn">
                    Explore Products
                </a>
            </div>
        `;
        return;
    }

    let subtotal = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    root.innerHTML = `
        <section class="cart-items">

            ${cart.map(item => `
                <article class="cart-item">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>₹${item.price} each</p>

                        <div class="quantity-controls">
                            <button data-action="minus"
                                    data-id="${item.id}">−</button>

                            <span>${item.quantity}</span>

                            <button data-action="plus"
                                    data-id="${item.id}">+</button>

                            <button class="remove-btn"
                                    data-action="remove"
                                    data-id="${item.id}">
                                Remove
                            </button>
                        </div>
                    </div>

                    <strong>₹${item.price * item.quantity}</strong>

                </article>
            `).join("")}

        </section>

        <aside class="summary-card">
            <h2>Order Summary</h2>

            <div class="summary-line">
                <span>Subtotal</span>
                <strong>₹${subtotal}</strong>
            </div>

            <div class="summary-line">
                <span>Delivery</span>
                <strong>Free</strong>
            </div>

            <hr>

            <div class="summary-line total-line">
                <span>Total</span>
                <strong>₹${subtotal}</strong>
            </div>

            <a href="checkout.html" class="primary-btn full-btn">
                Proceed to Checkout
            </a>
        </aside>
    `;

    root.querySelectorAll("button[data-action]").forEach(button => {

        button.addEventListener("click", function () {

            const id = Number(button.dataset.id);
            const action = button.dataset.action;

            let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const item = updatedCart.find(product => product.id === id);

            if (action === "remove") {
                updatedCart = updatedCart.filter(product => product.id !== id);
            }

            if (item && action === "plus") {
                item.quantity++;
            }

            if (item && action === "minus") {
                item.quantity = Math.max(1, item.quantity - 1);
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));

            if (typeof updateCartCount === "function") {
                updateCartCount();
            }

            renderCartPage();
        });

    });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
