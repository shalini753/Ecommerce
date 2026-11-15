
document.addEventListener("DOMContentLoaded", function () {

    const ordersRoot = document.getElementById("adminOrders");
    const productsRoot = document.getElementById("adminProducts");
    const statsRoot = document.getElementById("adminStats");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const totalRevenue = orders.reduce(function (sum, order) {
        return sum + order.total;
    }, 0);

    statsRoot.innerHTML = `
        <div class="stat-card">
            <span>Total Orders</span>
            <strong>${orders.length}</strong>
        </div>

        <div class="stat-card">
            <span>Demo Revenue</span>
            <strong>₹${totalRevenue}</strong>
        </div>

        <div class="stat-card">
            <span>Total Products</span>
            <strong>${products.length}</strong>
        </div>
    `;

    // DISPLAY ORDERS

    if (orders.length === 0) {

        ordersRoot.innerHTML = "<p>No orders placed yet.</p>";

    } else {

        ordersRoot.innerHTML = `
            <div class="table-scroll">
                <table class="admin-table">

                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>

                        ${orders.map(order => `
                            <tr>
                                <td>${order.id}</td>
                                <td>${order.customer.name}</td>
                                <td>₹${order.total}</td>
                                <td>${order.status}</td>

                                <td>
                                    <select class="status-select"
                                            data-order="${order.id}">

                                        <option>Order placed</option>
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>

                                    </select>
                                </td>
                            </tr>
                        `).join("")}

                    </tbody>

                </table>
            </div>
        `;

        document.querySelectorAll(".status-select").forEach(select => {

            const order = orders.find(item =>
                item.id === select.dataset.order
            );

            select.value = order.status;

            select.addEventListener("change", function () {

                const allOrders =
                    JSON.parse(localStorage.getItem("orders")) || [];

                const selectedOrder = allOrders.find(item =>
                    item.id === select.dataset.order
                );

                if (selectedOrder) {
                    selectedOrder.status = select.value;

                    localStorage.setItem(
                        "orders",
                        JSON.stringify(allOrders)
                    );

                    location.reload();
                }

            });

        });

    }

    // DISPLAY PRODUCTS

    productsRoot.innerHTML = `
        <div class="table-scroll">
            <table class="admin-table">

                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
                </thead>

                <tbody>

                    ${products.map(product => `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.category}</td>
                            <td>₹${product.price}</td>
                        </tr>
                    `).join("")}

                </tbody>

            </table>
        </div>
    `;

});
