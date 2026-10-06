// --------------------------------
// TOY HAVEN SERVICE WORKER
// --------------------------------

const cacheName =
    "toy-haven-cache-v2";


const files = [

    "./index.html",
    "./products.html",
    "./cart.html",
    "./wishlist.html",
    "./checkout.html",
    "./feedback.html",

    "./style.css",
    "./script.js",
    "./manifest.json",

    "./images/logo.jpg",
    "./images/banner.jpg",
    "./images/robot.jpg",
    "./images/car.jpg",
    "./images/boardgame.jpg",
    "./images/teddy.jpg",
    "./images/favicon.png"

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

        self.skipWaiting();

    }
);




self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches.keys()
                .then(
                    function (cacheNames) {

                        return Promise.all(

                            cacheNames.map(
                                function (name) {

                                    if (name !== cacheName) {

                                        return caches.delete(name);

                                    }

                                }
                            )

                        );

                    }
                )

        );

        self.clients.claim();

    }
);




self.addEventListener(
    "fetch",
    function (event) {

        if (event.request.method !== "GET") {
            return;
        }

        event.respondWith(

            caches.match(event.request)
                .then(
                    function (response) {

                        if (response) {

                            return response;

                        }

                        return fetch(event.request);

                    }
                )

        );

    }
);