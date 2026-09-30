// --------------------------------
// PRODUCT DATA
// --------------------------------

const products = [

    {
        id: 1,
        name: "Robot Figure",
        category: "Figurines",
        price: 24.99,
        image: "images/robot.jpg"
    },

    {
        id: 2,
        name: "Racing Car",
        category: "Diecast Cars",
        price: 19.99,
        image: "images/car.jpg"
    },

    {
        id: 3,
        name: "Adventure Board Game",
        category: "Board Games",
        price: 29.99,
        image: "images/boardgame.jpg"
    },

    {
        id: 4,
        name: "Teddy Bear",
        category: "Toys",
        price: 14.99,
        image: "images/teddy.jpg"
    }

];


// --------------------------------
// MOBILE MENU
// --------------------------------

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if (menuBtn != null) {

    menuBtn.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("show");

        }
    );

}


// --------------------------------
// HOME BANNER
// --------------------------------

const bannerTitle =
    document.getElementById("bannerTitle");


const banners = [

    "Discover Amazing Toys",

    "Amazing Board Games",

    "Collectible Figures",

    "Diecast Cars"

];


let bannerNumber = 0;


function changeBanner() {

    if (bannerTitle == null) {
        return;
    }

    bannerNumber++;

    if (bannerNumber >= banners.length) {
        bannerNumber = 0;
    }

    bannerTitle.innerText =
        banners[bannerNumber];

}


if (bannerTitle != null) {

    setInterval(
        changeBanner,
        3000
    );

}


// --------------------------------
// DISPLAY PRODUCT CARD
// --------------------------------

function createProductCard(product) {

    return `

        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}">

            <h3>${product.name}</h3>

            <p>
                ${product.category}
            </p>

            <p>
                £${product.price.toFixed(2)}
            </p>

            <button onclick="showProduct(${product.id})">
                View
            </button>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button onclick="addToWishlist(${product.id})">
                Add to Wishlist
            </button>

        </div>

    `;

}


// --------------------------------
// HOME FEATURED PRODUCTS
// --------------------------------

const featuredProducts =
    document.getElementById("featuredProducts");


if (featuredProducts != null) {

    let output = "";

    for (let i = 0; i < products.length; i++) {

        output +=
            createProductCard(products[i]);

    }

    featuredProducts.innerHTML =
        output;

}


// --------------------------------
// PRODUCT OF THE DAY
// --------------------------------

const productOfDay =
    document.getElementById("productOfDay");


if (productOfDay != null) {

    const today =
        new Date().getDay();

    const productNumber =
        today % products.length;

    productOfDay.innerHTML =
        createProductCard(
            products[productNumber]
        );

}


// --------------------------------
// PRODUCTS PAGE
// --------------------------------

const productList =
    document.getElementById("productList");


const searchProduct =
    document.getElementById("searchProduct");


const categoryFilter =
    document.getElementById("categoryFilter");


function displayProducts(productArray) {

    if (productList == null) {
        return;
    }


    let output = "";


    for (
        let i = 0;
        i < productArray.length;
        i++
    ) {

        output +=
            createProductCard(
                productArray[i]
            );

    }


    productList.innerHTML =
        output;

}


function filterProducts() {

    const search =
        searchProduct.value.toLowerCase();


    const category =
        categoryFilter.value;


    const filteredProducts =
        products.filter(
            function (product) {

                const nameMatch =
                    product.name
                    .toLowerCase()
                    .includes(search);


                const categoryMatch =
                    category == "All" ||
                    product.category == category;


                return nameMatch &&
                       categoryMatch;

            }
        );


    displayProducts(
        filteredProducts
    );

}


if (productList != null) {

    displayProducts(products);


    searchProduct.addEventListener(
        "input",
        filterProducts
    );


    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


// --------------------------------
// PRODUCT MODAL
// --------------------------------

function showProduct(id) {

    const product =
        products.find(
            function (item) {

                return item.id == id;

            }
        );


    const modal =
        document.getElementById(
            "productModal"
        );


    if (modal == null) {

        return;

    }


    document.getElementById(
        "modalImage"
    ).src =
        product.image;


    document.getElementById(
        "modalName"
    ).innerText =
        product.name;


    document.getElementById(
        "modalCategory"
    ).innerText =
        product.category;


    document.getElementById(
        "modalPrice"
    ).innerText =
        "£" +
        product.price.toFixed(2);


    modal.style.display =
        "block";

}


function closeModal() {

    document.getElementById(
        "productModal"
    ).style.display =
        "none";

}


// --------------------------------
// CART
// --------------------------------

function getCart() {

    const savedCart =
        localStorage.getItem("cart");


    if (savedCart == null) {
        return [];
    }


    return JSON.parse(savedCart);

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    let cart =
        getCart();


    const product =
        products.find(
            function (item) {

                return item.id == id;

            }
        );


    const existing =
        cart.find(
            function (item) {

                return item.id == id;

            }
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        product.quantity = 1;

        cart.push(product);

    }


    saveCart(cart);

    alert(
        product.name +
        " added to cart"
    );

}


// --------------------------------
// DISPLAY CART
// --------------------------------

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    if (cartItems == null) {
        return;
    }


    const cart =
        getCart();


    let output = "";

    let total = 0;


    for (
        let i = 0;
        i < cart.length;
        i++
    ) {

        const subtotal =
            cart[i].price *
            cart[i].quantity;


        total += subtotal;


        output += `

    <div class="cart-item">

        <img src="${cart[i].image}"
             alt="${cart[i].name}"
             class="cart-image">

        <div class="cart-details">

            <h3>
                ${cart[i].name}
            </h3>

            <p>
                Price:
                £${cart[i].price.toFixed(2)}
            </p>

            <p>
                Quantity:
                ${cart[i].quantity}
            </p>

            <button onclick="changeQuantity(${cart[i].id}, 1)">
                +
            </button>

            <button onclick="changeQuantity(${cart[i].id}, -1)">
                -
            </button>

            <p>
                Subtotal:
                £${subtotal.toFixed(2)}
            </p>

        </div>

    </div>

    `;
}


    cartItems.innerHTML =
        output;


    document.getElementById(
        "cartTotal"
    ).innerText =
        total.toFixed(2);

}


function changeQuantity(
    id,
    amount
) {

    let cart =
        getCart();


    const product =
        cart.find(
            function (item) {

                return item.id == id;

            }
        );


    product.quantity += amount;


    if (product.quantity <= 0) {

        cart =
            cart.filter(
                function (item) {

                    return item.id != id;

                }
            );

    }


    saveCart(cart);

    displayCart();

}


function clearCart() {

    localStorage.removeItem(
        "cart"
    );

    displayCart();

}


displayCart();


// --------------------------------
// WISHLIST
// --------------------------------

function getWishlist() {

    const saved =
        localStorage.getItem(
            "wishlist"
        );


    if (saved == null) {
        return [];
    }


    return JSON.parse(saved);

}


function addToWishlist(id) {

    let wishlist =
        getWishlist();


    const exists =
        wishlist.find(
            function (item) {

                return item.id == id;

            }
        );


    if (exists) {

        alert(
            "Already in wishlist"
        );

        return;

    }


    const product =
        products.find(
            function (item) {

                return item.id == id;

            }
        );


    product.status =
        "Interested";


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        "Added to wishlist"
    );

}


// --------------------------------
// DISPLAY WISHLIST
// --------------------------------

function displayWishlist() {

    const wishlistArea =
        document.getElementById(
            "wishlistItems"
        );


    if (wishlistArea == null) {
        return;
    }


    const wishlist =
        getWishlist();


    let output = "";


    for (
        let i = 0;
        i < wishlist.length;
        i++
    ) {

        output += `

            <div class="product-card">

                <img
                    src="${wishlist[i].image}"
                    alt="${wishlist[i].name}">

                <h3>
                    ${wishlist[i].name}
                </h3>

                <p>
                    Status:
                    ${wishlist[i].status}
                </p>

                <select
                    onchange="changeWishlistStatus(${wishlist[i].id}, this.value)">

                    <option value="Interested">
                        Interested
                    </option>

                    <option value="Owned">
                        Owned
                    </option>

                    <option value="Not Interested">
                        Not Interested
                    </option>

                </select>

            </div>

        `;

    }


    wishlistArea.innerHTML =
        output;

}


function changeWishlistStatus(
    id,
    status
) {

    let wishlist =
        getWishlist();


    const product =
        wishlist.find(
            function (item) {

                return item.id == id;

            }
        );


    product.status =
        status;


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    displayWishlist();

}


displayWishlist();


// --------------------------------
// CHECKOUT
// --------------------------------

const orderSummary =
    document.getElementById(
        "orderSummary"
    );


if (orderSummary != null) {

    const cart =
        getCart();


    let total = 0;

    let output = "";


    for (
        let i = 0;
        i < cart.length;
        i++
    ) {

        const subtotal =
            cart[i].price *
            cart[i].quantity;


        total += subtotal;


        output += `

            <p>
                ${cart[i].name}
                x
                ${cart[i].quantity}

                =
                £${subtotal.toFixed(2)}
            </p>

        `;

    }


    output += `

        <h3>
            Total:
            £${total.toFixed(2)}
        </h3>

    `;


    orderSummary.innerHTML =
        output;

}


// --------------------------------
// CHECKOUT FORM
// --------------------------------

const checkoutForm =
    document.getElementById("checkoutForm");


if (checkoutForm != null) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("fullName").value;

            const email =
                document.getElementById("email").value;

            const address =
                document.getElementById("address").value;

            const payment =
                document.getElementById("payment").value;

            const message =
                document.getElementById("checkoutMessage");


            // CHECK EMPTY FIELDS

            if (
                name == "" ||
                email == "" ||
                address == "" ||
                payment == ""
            ) {

                message.innerText =
                    "Please complete all fields.";

                message.style.color =
                    "red";

                return;
            }


            // CHECK EMAIL

            if (!email.includes("@")) {

                message.innerText =
                    "Please enter a valid email.";

                message.style.color =
                    "red";

                return;
            }


            // CREATE ORDER

            const order = {

                customer: name,

                email: email,

                address: address,

                payment: payment,

                cart: getCart()

            };


            // GET OLD ORDERS

            let orders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];


            // ADD NEW ORDER

            orders.push(order);


            // SAVE ORDERS

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            // CLEAR CART

            localStorage.removeItem("cart");


            // SUCCESS MESSAGE

            message.innerText =
                "✓ Order placed successfully!";

            message.style.color =
                "green";


            checkoutForm.reset();


            // CLEAR ORDER SUMMARY

            document.getElementById(
                "orderSummary"
            ).innerHTML =
                "<p>Order completed successfully.</p>";

        }
    );

}

// --------------------------------
// NEWSLETTER
// --------------------------------

const newsletterBtn =
    document.getElementById(
        "newsletterBtn"
    );


if (newsletterBtn != null) {

    newsletterBtn.addEventListener(
        "click",
        function () {

            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value;


            if (email == "") {

                alert(
                    "Enter your email"
                );

                return;

            }


            localStorage.setItem(
                "newsletter",
                email
            );


            document.getElementById(
                "newsletterMessage"
            ).innerText =
                "Thank you for subscribing!";

        }
    );

}


// --------------------------------
// FEEDBACK
// --------------------------------

const feedbackForm =
    document.getElementById("feedbackForm");


if (feedbackForm != null) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("feedbackName").value;

            const email =
                document.getElementById("feedbackEmail").value;

            const message =
                document.getElementById("feedbackMessage").value;

            const result =
                document.getElementById("feedbackResult");


            // CHECK EMPTY FIELDS

            if (
                name == "" ||
                email == "" ||
                message == ""
            ) {

                result.innerText =
                    "Please complete all fields.";

                result.style.color =
                    "red";

                return;
            }


            // CHECK EMAIL

            if (!email.includes("@")) {

                result.innerText =
                    "Please enter a valid email.";

                result.style.color =
                    "red";

                return;
            }


            // CREATE FEEDBACK OBJECT

            const feedback = {

                name: name,

                email: email,

                message: message

            };


            // GET OLD FEEDBACK

            let feedbackList =
                JSON.parse(
                    localStorage.getItem("feedback")
                ) || [];


            // ADD NEW FEEDBACK

            feedbackList.push(feedback);


            // SAVE FEEDBACK

            localStorage.setItem(
                "feedback",
                JSON.stringify(feedbackList)
            );


            // SUCCESS MESSAGE

            result.innerText =
                "✓ Thank you for your feedback!";

            result.style.color =
                "green";


            feedbackForm.reset();

        }
    );

}

// --------------------------------
// FAQ
// --------------------------------

const faqButtons =
    document.getElementsByClassName(
        "faq-button"
    );


for (
    let i = 0;
    i < faqButtons.length;
    i++
) {

    faqButtons[i].addEventListener(
        "click",
        function () {

            const answer =
                this.nextElementSibling;


            if (
                answer.style.display ==
                "block"
            ) {

                answer.style.display =
                    "none";

            }

            else {

                answer.style.display =
                    "block";

            }

        }
    );

}
// --------------------------------
// SERVICE WORKER
// --------------------------------

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        function () {

            navigator.serviceWorker.register(
                "sw.js"
            );

        }
    );

}