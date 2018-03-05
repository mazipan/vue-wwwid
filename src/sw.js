importScripts('workbox-sw.prod.v2.1.2.js');

const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
});


workbox.router.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.router.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'wwwid-api',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.router.registerRoute(
  new RegExp('^https:\/\/cdn-images.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'wwwid-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.router.registerRoute(
  new RegExp('^https:\/\/res.cloudinary.com\/.*'),
  workbox.strategies.cacheFirst({
    cacheName: 'wwwid-img',
    cacheableResponse: {
      statuses: [0, 200], // Make sure 0 is included in this list.
    }
  })
);

workbox.precache([]);
