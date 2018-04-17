importScripts("/vue-wwwid/precache-manifest.679d9fe3ad5e523cb07e1995eab1c941.js", "https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

const CACHE_NAME = 'vue-wwwid'

function generateCacheableConfig (name, maxEntry, maxDay) {
  return {
    cacheName: CACHE_NAME + name,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: maxEntry,
        maxAgeSeconds: maxDay * 24 * 60 * 60
      })
    ]
  }
}

workbox.routing.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('^https:\/\/api\.rss2json\.com.*'),
  workbox.strategies.cacheFirst(generateCacheableConfig('api', 10, 7))
);

workbox.routing.registerRoute(
  new RegExp('^https:\/\/cdn-images.*'),
  workbox.strategies.cacheFirst(generateCacheableConfig('img', 10, 30))
);

workbox.routing.registerRoute(
  new RegExp('^https:\/\/res\.cloudinary\.com.*'),
  workbox.strategies.cacheFirst(generateCacheableConfig('img', 10, 30))
);


