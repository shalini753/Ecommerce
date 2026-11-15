document.addEventListener("DOMContentLoaded", function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }

});