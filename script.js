// ==========================================
// SHOEHUB - SHOPPING CART SYSTEM
// ==========================================


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productName, productPrice, productImage) {

    // Get existing cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Check if product already exists
    let existingProduct = cart.find(
        product => product.name === productName
    );


    if (existingProduct) {

        // Increase quantity
        existingProduct.quantity++;

        // If image was not saved before, save it now
        if (!existingProduct.image && productImage) {
            existingProduct.image = productImage;
        }

    } else {

        // Add new product
        cart.push({

            name: productName,

            price: Number(productPrice),

            image: productImage || "",

            quantity: 1

        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Confirmation
    alert(
        productName +
        " has been added to your cart! 🛒"
    );

}



// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {

    // Get cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Find cart elements
    let cartItems =
        document.getElementById("cart-items");

    let cartTotal =
        document.getElementById("cart-total");

    let cartCount =
        document.getElementById("cart-count");


    // If this is not the cart page
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
    // DISPLAY PRODUCTS
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


        // Use a placeholder if image is missing
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
                    Price: ₹${product.price}
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
                    ₹${productTotal}
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


    // Make sure product exists
    if (!cart[index]) {
        return;
    }


    cart[index].quantity++;


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Refresh cart
    displayCart();

}



// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Make sure product exists
    if (!cart[index]) {
        return;
    }


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        // Remove product when quantity reaches zero
        cart.splice(index, 1);

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Refresh cart
    displayCart();

}



// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Make sure product exists
    if (!cart[index]) {
        return;
    }


    let productName =
        cart[index].name;


    // Remove product
    cart.splice(index, 1);


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Refresh cart
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


    // Don't do anything if already empty
    if (cart.length === 0) {

        alert("Your cart is already empty! 🛒");

        return;

    }


    // Confirm before clearing
    let confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) {
        return;
    }


    // Clear cart
    localStorage.removeItem("cart");


    // Refresh cart
    displayCart();


    alert(
        "Your cart has been cleared. 🛒"
    );

}



// ==========================================
// WHATSAPP CHECKOUT
// ==========================================

function checkout() {

    // Get cart
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // ==========================================
    // CHECK EMPTY CART
    // ==========================================

    if (cart.length === 0) {

        alert(
            "Your cart is empty! 🛒\n\n" +
            "Please add some products before checkout."
        );

        return;

    }


    // ==========================================
    // YOUR WHATSAPP NUMBER
    // ==========================================

    // India country code = 91
    // Your number = 8123883335

    let whatsappNumber =
        "918123883335";


    // ==========================================
    // CALCULATE ORDER
    // ==========================================

    let total = 0;

    let totalProducts = 0;


    // ==========================================
    // CREATE ORDER MESSAGE
    // ==========================================

    let message =
        "Hello ShoeHub! 👟\n\n" +

        "I would like to place an order.\n\n" +

        "🛍️ ORDER DETAILS\n" +

        "━━━━━━━━━━━━━━━━━━\n";


    // Add every product
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
            product.price +

            "\n" +

            "   Subtotal: ₹" +
            productTotal +

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


    // ==========================================
    // ENCODE MESSAGE
    // ==========================================

    let encodedMessage =
        encodeURIComponent(message);


    // ==========================================
    // CREATE WHATSAPP LINK
    // ==========================================

    let whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodedMessage;


    // ==========================================
    // OPEN WHATSAPP
    // ==========================================

    window.open(
        whatsappURL,
        "_blank"
    );

}



// ==========================================
// LOAD CART AUTOMATICALLY
// ==========================================

if (
    document.getElementById("cart-items")
) {

    displayCart();

}