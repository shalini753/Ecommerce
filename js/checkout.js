
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("checkoutForm");
    const summary = document.getElementById("checkoutSummary");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        summary.innerHTML = "<h2>Your cart is empty</h2>";
        form.style.display = "none";
        return;
    }

    let total = cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    summary.innerHTML = `
        <h2>Order Summary</h2>

        ${cart.map(item => `
            <div class="summary-line">
                <span>${item.name} × ${item.quantity}</span>
                <strong>₹${item.price * item.quantity}</strong>
            </div>
        `).join("")}

        <hr>

        <div class="summary-line total-line">
            <span>Total</span>
            <strong>₹${total}</strong>
        </div>
    `;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            document.getElementById("checkoutMessage").textContent =
                "Your cart is empty.";
            return;
        }

        const data = new FormData(form);

        const order = {
            id: "SE" + Date.now(),
            date: new Date().toLocaleString(),

            customer: {
                name: data.get("name"),
                email: data.get("email"),
                phone: data.get("phone"),
                address: data.get("address"),
                city: data.get("city"),
                pincode: data.get("pincode")
            },

            payment: data.get("payment"),
            status: "Order placed",
            items: cart,

            total: cart.reduce((sum, item) =>
                sum + item.price * item.quantity, 0
            )
        };

        let orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.unshift(order);

        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cart");

        window.location.href = "orders.html";
    });

});
