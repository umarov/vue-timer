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

workboxSW.precache([
  {
    "url": "a63c9fe9110431fcfb67.worker.js",
    "revision": "80f748dac84cdcdbafd50d115586aac2"
  },
  {
    "url": "index.html",
    "revision": "816961ff0bdb381f25f8ca64ff41eac9"
  },
  {
    "url": "static/css/app.7c1d9a0158718c919acadd758a0ce067.css",
    "revision": "87c0d87e3ecf377e22fc08fd829e119a"
  },
  {
    "url": "static/js/0.40f1bc24606bd7a767e0.js",
    "revision": "238d1189451bf440730f80d07a4a36a3"
  },
  {
    "url": "static/js/1.a39a3527cf0e39fa80b9.js",
    "revision": "7fc123f5869c73a748906d59a1e1abbb"
  },
  {
    "url": "static/js/2.03c46885aaac2676f622.js",
    "revision": "b51867611ee9d092e9ab770325188cf7"
  },
  {
    "url": "static/js/5.20433ecd958f6532148f.js",
    "revision": "c5b8d0e8595bc290460ec4ebe3f59edb"
  },
  {
    "url": "static/js/app.0e80abd036bde9c28262.js",
    "revision": "62e6cd25f3a9794ce7429ef5d54eef40"
  },
  {
    "url": "static/js/manifest.cc36eddae55898055686.js",
    "revision": "9e5665d4e2fe158223d1795cb53a9e6f"
  },
  {
    "url": "static/js/vendor.8ea825429446008651cf.js",
    "revision": "aee7a5a36fda45c78377fa6bc0cc426d"
  },
  {
    "url": "sw.js",
    "revision": "45e062738b26040dc5985fb0ed0b90e1"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
]);

