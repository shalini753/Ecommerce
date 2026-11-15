
document.addEventListener("DOMContentLoaded", function () {

    const root = document.getElementById("ordersList");

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {

        root.innerHTML = `
            <div class="empty-state">
                <h2>No orders yet</h2>
                <p>Your placed orders will appear here.</p>
                <a href="products.html" class="primary-btn">
                    Start Shopping
                </a>
            </div>
        `;

        return;
    }

    root.innerHTML = orders.map(order => `

        <article class="order-card">

            <div class="order-top">
                <div>
                    <h3>Order ${order.id}</h3>
                    <p class="muted">${order.date}</p>
                </div>

                <span class="status-pill">${order.status}</span>
            </div>

            <div class="order-products">

                ${order.items.map(item => `
                    <div class="summary-line">
                        <span>${item.name} × ${item.quantity}</span>
                        <strong>₹${item.price * item.quantity}</strong>
                    </div>
                `).join("")}

            </div>

            <div class="summary-line total-line">
                <span>Order Total</span>
                <strong>₹${order.total}</strong>
            </div>

            <p class="muted">Payment: ${order.payment}</p>

        </article>

    `).join("");

});
