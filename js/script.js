document.addEventListener("DOMContentLoaded", function () {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    let cart = [];

    // Adding products to the cart
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price").replace(',', ''), 10);
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toLocaleString()}
                <button class="remove-item" data-index="${index}">Remove</button>`;
            cartList.appendChild(li);
        });

        totalPriceElement.textContent = total.toLocaleString();
        attachRemoveEvent();
    }

    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
