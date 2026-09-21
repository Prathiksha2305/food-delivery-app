let cart = [];

const cartBtn = document.getElementById("cartBtn");
const addToCartButtons = document.querySelectorAll(".food-card .add-cart-btn");
addButtons.forEach(button => {
    button.addEventListener("click", () => {

        const card = button.parentElement;
        const foodName = card.querySelector("h3").innerText;
        const price = parseInt(
            card.querySelector("h4").innerText.replace("₹", "")
        );

        const existingItem = cart.find(item => item.name === foodName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: foodName,
                price: price,
                quantity: 1
            });
        }

        updateCartCount();
        button.innerText = "Added ✓";
        button.style.background = "#28a745";

setTimeout(() => {
    button.innerText = "Add to Cart";
    button.style.background = "";
}, 1000);
       
    });
});


function updateCartCount() {
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    cartBtn.innerText = `🛒 Cart (${count})`;
}


cartBtn.addEventListener("click", () => {

    const cartBox = document.getElementById("cartBox");
    const cartItems = document.getElementById("cartItems");
    const total = document.getElementById("total");

    cartBox.style.display = "block";
    cartItems.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>${item.name}</span>

                <span>
                    ₹${itemTotal}

                    <button onclick="decreaseItem(${index})">➖</button>

                    <b>${item.quantity}</b>

                    <button onclick="increaseItem(${index})">➕</button>

                    <button onclick="removeItem(${index})">❌</button>
                </span>

            </div>
        `;
    });

    total.innerText = `Total: ₹${totalPrice}`;
});


function increaseItem(index) {

    cart[index].quantity++;

    updateCartCount();

    document.getElementById("cartBtn").click();
}


function decreaseItem(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCartCount();

    document.getElementById("cartBtn").click();
}


function removeItem(index) {

    cart.splice(index, 1);

    updateCartCount();

    document.getElementById("cartBtn").click();
}


function closeCart() {
    document.getElementById("cartBox").style.display = "none";
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! 🎉");

    cart = [];

    updateCartCount();

    closeCart();
}


const searchInput = document.getElementById("searchInput");
const foodCards = document.querySelectorAll(".food-card");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    foodCards.forEach(card => {

        const foodName = card.querySelector("h3").innerText.toLowerCase();

        if (foodName.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


function filterFood(category) {

    const cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {

        const foodName = card.querySelector("h3").innerText.toLowerCase();

        if (category === "all") {
            card.style.display = "block";
        }
        else if (category === "pizza" && foodName.includes("pizza")) {
            card.style.display = "block";
        }
        else if (category === "burger" && foodName.includes("burger")) {
            card.style.display = "block";
        }
        else if (category === "biryani" && foodName.includes("biryani")) {
            card.style.display = "block";
        }
        else if (category === "pasta" && foodName.includes("pasta")) {
            card.style.display = "block";
        }
        else if (
            category === "dessert" &&
            (foodName.includes("cake") || foodName.includes("milkshake"))
        ) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    });
}


function openLogin() {
    document.getElementById("loginBox").style.display = "block";
}


function closeLogin() {
    document.getElementById("loginBox").style.display = "none";
}


function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill all fields!");
        return;
    }

    alert("Login successful! 🎉");

    closeLogin();
}
function openCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let foodTotal = 0;

    cart.forEach(item => {
        foodTotal += item.price * item.quantity;
    });

    const deliveryCharge = 30;
    const grandTotal = foodTotal + deliveryCharge;

    document.getElementById("foodTotal").innerText = `₹${foodTotal}`;
    document.getElementById("grandTotal").innerText = `₹${grandTotal}`;

    document.getElementById("checkoutBox").style.display = "block";
}


function closeCheckout() {
    document.getElementById("checkoutBox").style.display = "none";
}

function placeOrder() {
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;

    if (name === "" || phone === "" || address === "" || payment === "") {
        alert("Please fill all details!");
        return;
    }

    cart = [];
    updateCartCount();

    closeCheckout();
    closeCart();

    document.getElementById("successBox").style.display = "block";
}

function closeSuccess() {
    document.getElementById("successBox").style.display = "none";
}
function trackOrder() {
    document.getElementById("successBox").style.display = "none";

    const trackingBox = document.getElementById("trackingBox");

    if (trackingBox) {
        trackingBox.style.display = "block";
        startTracking();
    }
}

function closeTracking() {
    document.getElementById("trackingBox").style.display = "none";
}
function startTracking() {
    const steps = document.querySelectorAll(".tracking-step");

    steps.forEach(step => {
        step.classList.remove("active");
    });

    let currentStep = 0;

    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add("active");
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}
function toggleFavorite(button) {
    if (button.innerText === "♡") {
        button.innerText = "❤️";
    } else {
        button.innerText = "♡";
    }
}