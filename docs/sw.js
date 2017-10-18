importScripts('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/workbox-sw.prod.v2.1.0.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');


const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute('https://fonts.googleapis.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://www.gstatic.com/firebasejs/4.5.0/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://unpkg.com/workbox-sw@2.1.0/build/importScripts/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://fonts.gstatic.com/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.router.registerRoute('https://cdnjs.cloudflare.com/ajax/libs/animate.css(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'gstatic',
    cacheableResponse: {
      statuses: [0, 200]
    },
    networkTimeoutSeconds: 4
  })
);

workboxSW.precache([
  {
    "url": "95a30d460e0e6b309753.worker.js",
    "revision": "df05ea0d4c2b98506167108b3cb45c35"
  },
  {
    "url": "firebase-messaging-sw.js",
    "revision": "b7ba659795537e1bfbca0ea369e8a7e5"
  },
  {
    "url": "index.html",
    "revision": "c138448494f9a603848b31368c6e2118"
  },
  {
    "url": "static/css/app.4cbd75d60eb50db74b37959b15142bf1.css",
    "revision": "3011359c8d779aa0f12336c09c825b18"
  },
  {
    "url": "static/js/0.4f08e339badd38d89cff.js",
    "revision": "1a817ae67c845d2a8f4e48cce8b0cc54"
  },
  {
    "url": "static/js/1.3985d4fa952ab5e2bd66.js",
    "revision": "d9fe034edf0e734affcb81c5b9096d6e"
  },
  {
    "url": "static/js/2.e3f3a914e9a866bb6ddf.js",
    "revision": "cd3777fa42166556e0c20a518e9cc5fc"
  },
  {
    "url": "static/js/5.70b5541d7100f07f30c1.js",
    "revision": "a74eda2d8746a7f0500450c0d8a61148"
  },
  {
    "url": "static/js/app.b3f1be2423ddb2445154.js",
    "revision": "79f35487e686ffd7c045ab59b1cf7a09"
  },
  {
    "url": "static/js/manifest.7a7c3bc905124bd54fd5.js",
    "revision": "ab49eaa91a6cbf851e7c7f2f3f67c405"
  },
  {
    "url": "static/js/vendor.f9e1237bb4adaa19ce1a.js",
    "revision": "ce0889ad2daf11611b2b7a06443918c0"
  }
]);
