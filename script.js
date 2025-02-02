const cart = [];
let totalCost = 0;

document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        const item = event.target.parentElement;
        const coffeeName = item.getAttribute("data-name");
        const coffeePrice = parseFloat(item.getAttribute("data-price"));

        cart.push({ name: coffeeName, price: coffeePrice });
        totalCost += coffeePrice;
        updateCart();
    });
});

function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalCostElement = document.getElementById("total-cost");
    cartList.innerHTML = "";

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });

    totalCostElement.textContent = totalCost.toFixed(2);
}

document.getElementById("order-btn").addEventListener("click", async () => {
    if (cart.length === 0) {
        document.getElementById("message").textContent = "Your cart is empty!";
        return;
    }

    const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, totalCost }),
    });

    const data = await response.json();
    
    // Save order details in localStorage and redirect to cart.html
    localStorage.setItem("orderDetails", JSON.stringify({ cart, totalCost }));
    window.location.href = "cart.html";
});
