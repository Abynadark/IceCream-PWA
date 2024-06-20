// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = [
  
  'index.html',

  'cardapio.html',

  'maps.html',

  'script.js',

  'style.css',

  'src/home.svg',

  'src/mapa.svg',

  'src/menu.svg',

  'src/planodefundosorvete.jpg',

  'imagens/img_sorveteria/espaco1_300x300.jpeg',

  'imagens/img_sorveteria/espaco2_300x300.jpeg',

  'imagens/img_sorveteria/espaco3_300x300.jpeg',

  'imagens/img_sorveteria/espaco4_300x300.jpeg',

  'imagens/img_sorvetes/acai2_300x400.jpeg',

  'imagens/img_sorvetes/milkshake2_300x400.jpeg',

  'imagens/img_sorvetes/milkshake4_300x400.jpeg',

  'imagens/img_sorvetes/milkshake5_300x400.jpeg',

  'imagens/img_sorvetes/picoles_300x400.jpeg',

  'imagens/img_sorvetes/sorvetecopo_300x400.jpeg',

  'imagens/img_sorvetes/sorvetes_300x400 (1).jpg',

  'imagens/img_sorvetes/sundae_300x400.jpeg',

  'imagens/img_sorvetes/topsundae_300x400.jpeg',
  
  'ios/512.png',

  'ios/1024.png',

];


self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});