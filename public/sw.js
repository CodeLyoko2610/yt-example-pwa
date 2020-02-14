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
                '/src/images/pwa.jpg',
                'https://fonts.googleapis.com/css?family=Raleway:400,700' //not only relative path, actual urls are also okay
            ])
        }));
})

self.addEventListener('activate', function () {
    console.log('Service Worker activated.');
})