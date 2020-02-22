self.addEventListener('install', function (event) {
    console.log('Service Worker installed.');

    //Making sure the cache done saving before Service Worker goes down
    event.waitUntil(
        //Open / create a cache storage with the name 'static'
        caches.open('static').then(function (cache) {
            //Add to the cache one by one
            // cache.add('/src/js/app.js'); //Argument is the path, browser makes http request to this path and store the response
            // cache.add('/src/index.html');

            //Add everything once
            cache.addAll([
                '/',
                '/index.html',
                'src/js/app.js',
                'src/css/app.css',
                'manifest.json',
                '/src/images/pwa.jpg',
                '/src/images/icons/app-icon-144x144.png',
                'https://fonts.googleapis.com/css?family=Raleway:400,700' //not only relative path, actual urls are also okay
            ]);
        })
    );
});

self.addEventListener('activate', function () {
    console.log('Service Worker activated.');
});

//Change the default when fetching data
self.addEventListener('fetch', function (event) {
    //Change default
    event.respondWith(
        caches.match(event.request).then(
            function (res) {
                if (res) {
                    //If caches has a cache for the request, serve from caches
                    console.log('Served using cache: ' + event.request.url);
                    return res;
                } else {
                    //If not, fetch from network
                    console.log('Fetch fresh data: ' + event.request.url);
                    return fetch(event.request);
                }
            }
        )
    );
})