const cacheName =
    "toy-haven-cache";

const files = [
    "index.html",
    "products.html",
    "cart.html",
    "wishlist.html",
    "checkout.html",
    "feedback.html",
    "style.css",
    "script.js"
];


self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(

            caches.open(cacheName)
            .then(
                function (cache) {

                    return cache.addAll(files);

                }
            )

        );

    }
);


self.addEventListener(
    "fetch",
    function (event) {

        event.respondWith(

            caches.match(event.request)
            .then(
                function (response) {

                    return response ||
                           fetch(event.request);

                }
            )

        );

    }
);