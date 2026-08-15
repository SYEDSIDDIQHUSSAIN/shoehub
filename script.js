// ==========================================
// SHOEHUB - COMPLETE SHOPPING SYSTEM
// ==========================================


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productName, productPrice, productImage) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find(
        product => product.name === productName
    );

    if (existingProduct) {

        existingProduct.quantity++;

        if (!existingProduct.image && productImage) {
            existingProduct.image = productImage;
        }

    } else {

        cart.push({

            name: productName,

            price: Number(productPrice),

            image: productImage || "",

            quantity: 1

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(
        productName +
        " has been added to your cart! 🛒"
    );

}


// ==========================================
// SHOP NOW - DIRECT WHATSAPP ORDER
// ==========================================

function shopNow(productName, productPrice) {

    // Your WhatsApp number
    let whatsappNumber = "918123883335";

    // Create order message
    let message =
        "Hello ShoeHub! 👟\n\n" +

        "🛍️ NEW ORDER\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +

        "👟 Product: " +
        productName + "\n\n" +

        "💰 Price: ₹" +
        Number(productPrice).toLocaleString("en-IN") +
        "\n\n" +

        "📦 Quantity: 1\n\n" +

        "━━━━━━━━━━━━━━━━━━\n" +

        "I would like to order this product.\n\n" +

        "Thank you! 😊";

    // Encode message
    let encodedMessage =
        encodeURIComponent(message);

    // WhatsApp URL
    let whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodedMessage;

    // Open WhatsApp
    window.open(
        whatsappURL,
        "_blank"
    );

    // Customer confirmation
    setTimeout(function () {

        alert(
            "Order request created successfully! ✅\n\n" +
            "WhatsApp will open with your order details.\n\n" +
            "Please send the message to confirm your order."
        );

    }, 500);

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let cartItems =
        document.getElementById("cart-items");

    let cartTotal =
        document.getElementById("cart-total");

    let cartCount =
        document.getElementById("cart-count");


    if (!cartItems) {
        return;
    }


    // ==========================================
    // EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty 🛒
                </h3>

                <p>
                    You haven't added any products yet.
                </p>

                <a href="products.html">
                    Browse Products
                </a>

            </div>

        `;


        if (cartTotal) {
            cartTotal.textContent = "0";
        }


        if (cartCount) {
            cartCount.textContent = "0";
        }


        return;

    }


    // Clear previous items

    cartItems.innerHTML = "";


    let total = 0;

    let numberOfProducts = 0;


    // ==========================================
    // DISPLAY CART PRODUCTS
    // ==========================================

    cart.forEach(function(product, index) {

        let productTotal =
            Number(product.price) *
            Number(product.quantity);


        total += productTotal;

        numberOfProducts +=
            Number(product.quantity);


        let cartProduct =
            document.createElement("div");


        cartProduct.className =
            "cart-product";


        let imageSource =
            product.image ||
            "https://via.placeholder.com/300x300?text=ShoeHub";


        cartProduct.innerHTML = `

            <img
                src="${imageSource}"
                alt="${product.name}">


            <div class="cart-product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Price: ₹${Number(product.price).toLocaleString("en-IN")}
                </p>


                <div class="quantity">

                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>

                </div>

            </div>


            <div class="cart-product-right">

                <h3>
                    ₹${productTotal.toLocaleString("en-IN")}
                </h3>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    🗑 Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartProduct);

    });


    // ==========================================
    // UPDATE TOTAL
    // ==========================================

    if (cartTotal) {

        cartTotal.textContent =
            total.toLocaleString("en-IN");

    }


    // ==========================================
    // UPDATE PRODUCT COUNT
    // ==========================================

    if (cartCount) {

        cartCount.textContent =
            numberOfProducts;

    }

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    let productName =
        cart[index].name;


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();


    alert(
        productName +
        " has been removed from your cart."
    );

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is already empty! 🛒"
        );

        return;

    }


    let confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) {
        return;
    }


    localStorage.removeItem("cart");


    displayCart();


    alert(
        "Your cart has been cleared. 🛒"
    );

}


// ==========================================
// CHECKOUT - SEND ENTIRE CART TO WHATSAPP
// ==========================================

function checkout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty! 🛒\n\n" +
            "Please add some products before checkout."
        );

        return;

    }


    // Your WhatsApp number
    let whatsappNumber =
        "918123883335";


    let total = 0;

    let totalProducts = 0;


    // ==========================================
    // CREATE ORDER MESSAGE
    // ==========================================

    let message =
        "Hello ShoeHub! 👟\n\n" +

        "🛍️ I WOULD LIKE TO PLACE AN ORDER\n\n" +

        "━━━━━━━━━━━━━━━━━━\n" +

        "📦 ORDER DETAILS\n" +

        "━━━━━━━━━━━━━━━━━━\n";


    cart.forEach(function(product, index) {

        let productTotal =
            Number(product.price) *
            Number(product.quantity);


        total += productTotal;

        totalProducts +=
            Number(product.quantity);


        message +=

            "\n" +

            (index + 1) +
            ". " +
            product.name +

            "\n" +

            "   Quantity: " +
            product.quantity +

            "\n" +

            "   Price: ₹" +
            Number(product.price).toLocaleString("en-IN") +

            "\n" +

            "   Subtotal: ₹" +
            productTotal.toLocaleString("en-IN") +

            "\n";

    });


    // ==========================================
    // ORDER SUMMARY
    // ==========================================

    message +=

        "\n" +

        "━━━━━━━━━━━━━━━━━━\n" +

        "📦 Total Products: " +
        totalProducts +

        "\n" +

        "💰 Total Amount: ₹" +
        total.toLocaleString("en-IN") +

        "\n" +

        "━━━━━━━━━━━━━━━━━━\n\n" +

        "Please confirm my order.\n\n" +

        "Thank you! 😊";


    // Encode message

    let encodedMessage =
        encodeURIComponent(message);


    // WhatsApp URL

    let whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodedMessage;


    // Open WhatsApp

    window.open(
        whatsappURL,
        "_blank"
    );


    // Customer message

    setTimeout(function () {

        alert(
            "Your order details are ready! ✅\n\n" +
            "WhatsApp has been opened.\n" +
            "Please send the message to ShoeHub to confirm your order."
        );

    }, 500);

}


// ==========================================
// LOAD CART AUTOMATICALLY
// ==========================================

if (
    document.getElementById("cart-items")
) {

    displayCart();

}