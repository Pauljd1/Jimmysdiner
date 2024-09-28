// Function to handle navbar background change on scroll
function userScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("bg-dark", "navbar-sticky");
        } else {
            navbar.classList.remove("bg-dark", "navbar-sticky");
        }
    });
}

document.addEventListener("DOMContentLoaded", userScroll);

const cart = [];
const itemCount = document.getElementById("itemCount");
const cartItemsContainer = document.getElementById("cartItems");
const discountCodeInput = document.getElementById("discountCode");

function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const itemElement = document.createElement("div");
        itemElement.className =
            "d-flex justify-content-between align-items-center cart-item";
        itemElement.innerHTML = `<span>${
            item.name
        }</span><span>$${item.price.toFixed(2)}</span>
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>`;
        cartItemsContainer.appendChild(itemElement);
    });

    // Calculate discount if applicable
    let discount = 0;
    const discountCode = discountCodeInput.value;
    if (discountCode === "SCRIMBA10") {
        discount = total * 0.1;
        total -= discount;
        cartItemsContainer.innerHTML += `<div class="text-danger">Discount Applied: -$${discount.toFixed(
            2
        )}</div>`;
    }

    cartItemsContainer.innerHTML += `<hr><strong>Total: $${total.toFixed(
        2
    )}</strong>`;
    itemCount.textContent = cart.length;
}

// Add to Cart Function
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
        const itemName = this.getAttribute("data-name");
        const itemPrice = parseFloat(this.getAttribute("data-price"));
        cart.push({ name: itemName, price: itemPrice });
        updateCart();
    });
});

// Remove Item Functionality
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
    }
});

// Apply Discount
document
    .getElementById("applyDiscountButton")
    .addEventListener("click", function () {
        updateCart();
    });

// Checkout
document
    .getElementById("checkoutButton")
    .addEventListener("click", function () {
        $("#cartModal").modal("hide");
        $("#paymentModal").modal("show");
    });

// Confirm Payment
document
    .getElementById("confirmPaymentButton")
    .addEventListener("click", function () {
        $("#paymentModal").modal("hide");
        $("#thankYouModal").modal("show");
        cart.length = 0;
        updateCart();
    });
