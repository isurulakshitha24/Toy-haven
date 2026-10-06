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

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn !== null && navMenu !== null) {

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("show");

        const isOpen =
            navMenu.classList.contains("show");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });
}


// --------------------------------
// HOME HEADER SEARCH
// --------------------------------

const topSearch =
    document.getElementById("topSearch");

if (topSearch !== null) {

    topSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                const searchText =
                    topSearch.value.trim();

                if (searchText !== "") {

                    window.location.href =
                        "products.html?search=" +
                        encodeURIComponent(searchText);

                } else {

                    window.location.href =
                        "products.html";
                }
            }
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

    if (bannerTitle === null) {
        return;
    }

    bannerNumber++;

    if (bannerNumber >= banners.length) {
        bannerNumber = 0;
    }

    bannerTitle.innerText =
        banners[bannerNumber];
}

if (bannerTitle !== null) {

    setInterval(
        changeBanner,
        3000
    );
}


// --------------------------------
// CREATE PRODUCT CARD
// --------------------------------

function createProductCard(product) {

    return `
        <div class="product-card">

            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy"
                 decoding="async">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p>£${product.price.toFixed(2)}</p>

            <button type="button"
                    onclick="showProduct(${product.id})">
                View
            </button>

            <button type="button"
                    onclick="addToCart(${product.id})">
                Add to Cart
            </button>

            <button type="button"
                    onclick="addToWishlist(${product.id})">
                Add to Wishlist
            </button>

        </div>
    `;
}


// --------------------------------
// HOME FEATURED PRODUCTS
// --------------------------------

const featuredProducts =
    document.getElementById(
        "featuredProducts"
    );

if (featuredProducts !== null) {

    let output = "";

    for (
        let i = 0;
        i < products.length;
        i++
    ) {

        output +=
            createProductCard(
                products[i]
            );
    }

    featuredProducts.innerHTML =
        output;
}


// --------------------------------
// PRODUCT OF THE DAY
// --------------------------------

const productOfDay =
    document.getElementById(
        "productOfDay"
    );

if (productOfDay !== null) {

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
    document.getElementById(
        "productList"
    );

const searchProduct =
    document.getElementById(
        "searchProduct"
    );

const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


function displayProducts(productArray) {

    if (productList === null) {
        return;
    }

    let output = "";

    if (productArray.length === 0) {

        output =
            "<p>No products found.</p>";

    } else {

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
    }

    productList.innerHTML =
        output;
}


function filterProducts() {

    if (
        searchProduct === null ||
        categoryFilter === null
    ) {
        return;
    }

    const search =
        searchProduct.value
            .trim()
            .toLowerCase();

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
                    category === "All" ||
                    product.category === category;

                return (
                    nameMatch &&
                    categoryMatch
                );
            }
        );

    displayProducts(
        filteredProducts
    );
}


if (
    productList !== null &&
    searchProduct !== null &&
    categoryFilter !== null
) {

    // Get search sent from home page

    const parameters =
        new URLSearchParams(
            window.location.search
        );

    const searchValue =
        parameters.get("search");

    if (searchValue !== null) {

        searchProduct.value =
            searchValue;
    }

    displayProducts(products);

    if (searchValue !== null) {
        filterProducts();
    }

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
                return item.id === id;
            }
        );

    if (product === undefined) {
        return;
    }

    const modal =
        document.getElementById(
            "productModal"
        );

    // Home page does not have a modal.
    // Send user to the products page.

    if (modal === null) {

        window.location.href =
            "products.html";

        return;
    }

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalCategory =
        document.getElementById(
            "modalCategory"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    if (modalImage !== null) {

        modalImage.src =
            product.image;

        modalImage.alt =
            product.name;
    }

    if (modalName !== null) {

        modalName.innerText =
            product.name;
    }

    if (modalCategory !== null) {

        modalCategory.innerText =
            product.category;
    }

    if (modalPrice !== null) {

        modalPrice.innerText =
            "£" +
            product.price.toFixed(2);
    }

    modal.style.display =
        "block";
}


function closeModal() {

    const modal =
        document.getElementById(
            "productModal"
        );

    if (modal !== null) {

        modal.style.display =
            "none";
    }
}


// Close modal with Escape key

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();
        }
    }
);


// --------------------------------
// CART
// --------------------------------

function getCart() {

    const savedCart =
        localStorage.getItem("cart");

    if (savedCart === null) {
        return [];
    }

    try {

        return JSON.parse(savedCart);

    } catch (error) {

        return [];
    }
}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


function addToCart(id) {

    let cart = getCart();

    const product =
        products.find(
            function (item) {
                return item.id === id;
            }
        );

    if (product === undefined) {
        return;
    }

    const existing =
        cart.find(
            function (item) {
                return item.id === id;
            }
        );

    if (existing) {

        existing.quantity++;

    } else {

        const cartProduct = {
            ...product,
            quantity: 1
        };

        cart.push(cartProduct);
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

    if (cartItems === null) {
        return;
    }

    const cart = getCart();

    let output = "";
    let total = 0;

    if (cart.length === 0) {

        output =
            "<p>Your cart is empty.</p>";

    } else {

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
                         class="cart-image"
                         loading="lazy"
                         decoding="async">

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

                        <button type="button"
                                aria-label="Increase ${cart[i].name} quantity"
                                onclick="changeQuantity(${cart[i].id}, 1)">
                            +
                        </button>

                        <button type="button"
                                aria-label="Decrease ${cart[i].name} quantity"
                                onclick="changeQuantity(${cart[i].id}, -1)">
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
    }

    cartItems.innerHTML =
        output;

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    if (cartTotal !== null) {

        cartTotal.innerText =
            total.toFixed(2);
    }
}


function changeQuantity(
    id,
    amount
) {

    let cart = getCart();

    const product =
        cart.find(
            function (item) {
                return item.id === id;
            }
        );

    if (product === undefined) {
        return;
    }

    product.quantity += amount;

    if (product.quantity <= 0) {

        cart =
            cart.filter(
                function (item) {
                    return item.id !== id;
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

    if (saved === null) {
        return [];
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        return [];
    }
}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );
}


function addToWishlist(id) {

    let wishlist =
        getWishlist();

    const exists =
        wishlist.find(
            function (item) {
                return item.id === id;
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
                return item.id === id;
            }
        );

    if (product === undefined) {
        return;
    }

    const wishlistProduct = {
        ...product,
        status: "Interested"
    };

    wishlist.push(
        wishlistProduct
    );

    saveWishlist(wishlist);

    console.log(product.name + "added to wishlist");
    console.log("current wishlist", wishlist);
    

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

    if (wishlistArea === null) {
        return;
    }

    const wishlist =
        getWishlist();

    let output = "";

    if (wishlist.length === 0) {

        output =
            "<p>Your wishlist is empty.</p>";

    } else {

        for (
            let i = 0;
            i < wishlist.length;
            i++
        ) {

            const status =
                wishlist[i].status ||
                "Interested";

            output += `
                <div class="product-card">

                    <img src="${wishlist[i].image}"
                         alt="${wishlist[i].name}"
                         loading="lazy"
                         decoding="async">

                    <h3>
                        ${wishlist[i].name}
                    </h3>

                    <p>
                        Status:
                        ${status}
                    </p>

                    <label for="wishlistStatus${wishlist[i].id}">
                        Change status
                    </label>

                    <select
                        id="wishlistStatus${wishlist[i].id}"
                        onchange="changeWishlistStatus(${wishlist[i].id}, this.value)">

                        <option value="Interested"
                            ${status === "Interested" ? "selected" : ""}>
                            Interested
                        </option>

                        <option value="Owned"
                            ${status === "Owned" ? "selected" : ""}>
                            Owned
                        </option>

                        <option value="Not Interested"
                            ${status === "Not Interested" ? "selected" : ""}>
                            Not Interested
                        </option>

                    </select>

                </div>
            `;
        }
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
                return item.id === id;
            }
        );

    if (product === undefined) {
        return;
    }

    product.status =
        status;

    saveWishlist(
        wishlist
    );

    displayWishlist();
}


displayWishlist();


// --------------------------------
// CHECKOUT ORDER SUMMARY
// --------------------------------

function displayOrderSummary() {

    const orderSummary =
        document.getElementById(
            "orderSummary"
        );

    if (orderSummary === null) {
        return;
    }

    const cart = getCart();

    let total = 0;
    let output = "";

    if (cart.length === 0) {

        orderSummary.innerHTML =
            "<p>Your cart is empty.</p>";

        return;
    }

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
                x ${cart[i].quantity}
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


displayOrderSummary();


// --------------------------------
// CHECKOUT FORM
// --------------------------------

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

if (checkoutForm !== null) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "fullName"
                ).value.trim();

            const email =
                document.getElementById(
                    "email"
                ).value.trim();

            const address =
                document.getElementById(
                    "address"
                ).value.trim();

            const payment =
                document.getElementById(
                    "payment"
                ).value;

            const message =
                document.getElementById(
                    "checkoutMessage"
                );

            const cart =
                getCart();


            // Empty cart

            if (cart.length === 0) {

                message.innerText =
                    "Your cart is empty.";

                message.style.color =
                    "#b00020";

                return;
            }


            // Empty fields

            if (
                name === "" ||
                email === "" ||
                address === "" ||
                payment === ""
            ) {

                message.innerText =
                    "Please complete all fields.";

                message.style.color =
                    "#b00020";

                return;
            }


            // Email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(email)
            ) {

                message.innerText =
                    "Please enter a valid email.";

                message.style.color =
                    "#b00020";

                return;
            }


            // Calculate order total

            let total = 0;

            for (
                let i = 0;
                i < cart.length;
                i++
            ) {

                total +=
                    cart[i].price *
                    cart[i].quantity;
            }


            // Create order

            const order = {

                customer: name,

                email: email,

                address: address,

                payment: payment,

                cart: cart,

                total: total,

                date:
                    new Date()
                        .toLocaleString()
            };


            // Get previous orders

            let orders = [];

            try {

                orders =
                    JSON.parse(
                        localStorage.getItem(
                            "orders"
                        )
                    ) || [];

            } catch (error) {

                orders = [];
            }


            // Save new order

            orders.push(order);

            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            // Clear cart

            localStorage.removeItem(
                "cart"
            );


            // Success message

            message.innerText =
                "✓ Order placed successfully!";

            message.style.color =
                "#006400";

            checkoutForm.reset();

            displayOrderSummary();
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

if (newsletterBtn !== null) {

    newsletterBtn.addEventListener(
        "click",
        function () {

            const emailInput =
                document.getElementById(
                    "newsletterEmail"
                );

            const newsletterMessage =
                document.getElementById(
                    "newsletterMessage"
                );

            if (
                emailInput === null ||
                newsletterMessage === null
            ) {
                return;
            }

            const email =
                emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (email === "") {

                newsletterMessage.innerText =
                    "Please enter your email.";

                newsletterMessage.style.color =
                    "#ffdddd";

                return;
            }


            if (
                !emailPattern.test(email)
            ) {

                newsletterMessage.innerText =
                    "Please enter a valid email.";

                newsletterMessage.style.color =
                    "#ffdddd";

                return;
            }


            localStorage.setItem(
                "newsletter",
                email
            );


            newsletterMessage.innerText =
                "Thank you for subscribing!";

            newsletterMessage.style.color =
                "#ffffff";

            emailInput.value = "";
        }
    );
}


// --------------------------------
// FEEDBACK
// --------------------------------

const feedbackForm =
    document.getElementById(
        "feedbackForm"
    );

if (feedbackForm !== null) {

    feedbackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "feedbackName"
                ).value.trim();

            const email =
                document.getElementById(
                    "feedbackEmail"
                ).value.trim();

            const feedbackMessage =
                document.getElementById(
                    "feedbackMessage"
                ).value.trim();

            const result =
                document.getElementById(
                    "feedbackResult"
                );


            // Empty fields

            if (
                name === "" ||
                email === "" ||
                feedbackMessage === ""
            ) {

                result.innerText =
                    "Please complete all fields.";

                result.style.color =
                    "#b00020";

                return;
            }


            // Email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                !emailPattern.test(email)
            ) {

                result.innerText =
                    "Please enter a valid email.";

                result.style.color =
                    "#b00020";

                return;
            }


            // Create feedback object

            const feedback = {

                name: name,

                email: email,

                message: feedbackMessage,

                date:
                    new Date()
                        .toLocaleString()
            };


            // Get old feedback

            let feedbackList = [];

            try {

                feedbackList =
                    JSON.parse(
                        localStorage.getItem(
                            "feedback"
                        )
                    ) || [];

            } catch (error) {

                feedbackList = [];
            }


            // Save feedback

            feedbackList.push(
                feedback
            );

            localStorage.setItem(
                "feedback",
                JSON.stringify(
                    feedbackList
                )
            );


            // Success

            result.innerText =
                "✓ Thank you for your feedback!";

            result.style.color =
                "#006400";

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

            if (answer === null) {
                return;
            }

            answer.classList.toggle(
                "show"
            );

            const isOpen =
                answer.classList.contains(
                    "show"
                );

            this.setAttribute(
                "aria-expanded",
                isOpen
            );
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

            navigator.serviceWorker
                .register("sw.js")
                .catch(
                    function (error) {

                        console.log(
                            "Service worker registration failed:",
                            error
                        );
                    }
                );
        }
    );
}