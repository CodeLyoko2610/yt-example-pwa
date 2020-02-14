self.addEventListener('install', function () {
    console.log('Service Worker installed.');
})

self.addEventListener('activate', function () {
    console.log('Service Worker activated.');
})