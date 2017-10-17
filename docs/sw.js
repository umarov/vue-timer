importScripts('workbox-sw.prod.v2.1.0.js');
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
    "url": "a63c9fe9110431fcfb67.worker.js",
    "revision": "80f748dac84cdcdbafd50d115586aac2"
  },
  {
    "url": "index.html",
    "revision": "1bcb07d9ec4acf309c352421f5e1764f"
  },
  {
    "url": "static/css/app.05b5529e147e527a4e8d702617450f4b.css",
    "revision": "099fd4e95bdab250166e83d14f648496"
  },
  {
    "url": "static/js/0.858276eba815e7467dbc.js",
    "revision": "33a1856ba0aaf5c9b1dae8a8a4a5a8a8"
  },
  {
    "url": "static/js/1.1456c16cda280cbb3108.js",
    "revision": "043f498429dcc75ea92cb7bcc7dc552e"
  },
  {
    "url": "static/js/2.9b23cfc26e073bffee90.js",
    "revision": "36310939a0eff4c7ff35082d9bcf2930"
  },
  {
    "url": "static/js/5.20433ecd958f6532148f.js",
    "revision": "c5b8d0e8595bc290460ec4ebe3f59edb"
  },
  {
    "url": "static/js/app.3f498f60eaeb71741d8a.js",
    "revision": "faf96489897615479606c928fad96231"
  },
  {
    "url": "static/js/manifest.679e88f513b7db9a0ee6.js",
    "revision": "1953654ee7c3144f5e66fe6a34ff6c11"
  },
  {
    "url": "static/js/vendor.8ea825429446008651cf.js",
    "revision": "aee7a5a36fda45c78377fa6bc0cc426d"
  },
  {
    "url": "sw.js",
    "revision": "93e82138b1c4d6095fc461f29629ab95"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
]);

