// Installationsprozess
self.addEventListener("install", function (event) {
  console.log("Service Worker installiert");
});

// Aktivierungsprozess
self.addEventListener("activate", function (event) {
  console.log("Service Worker aktiviert");
});

// Caches für statische Assets und API-Aufrufe erstellen
const staticCacheName = "static-cache-v1";
const apiCacheName = "api-cache-v1";

// Assets und API-Aufrufe cachen
self.addEventListener("fetch", function (event) {
  const url = event.request.url;

  // Cache für statische Assets
  if (url.includes("/static/")) {
    event.respondWith(
      caches.open(staticCacheName).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      })
    );
  }

  // Cache für API-Aufrufe
  else if (url.includes("/api/")) {
    event.respondWith(
      caches.open(apiCacheName).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  }
});
