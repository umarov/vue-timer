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
    "revision": "85763624b3756e6e632f29e777ed3749"
  },
  {
    "url": "static/css/app.7c1d9a0158718c919acadd758a0ce067.css",
    "revision": "87c0d87e3ecf377e22fc08fd829e119a"
  },
  {
    "url": "static/js/0.b8fe6dee31d92ea702ec.js",
    "revision": "6a99e09cfefeeb2a7361aa2a3903dfbb"
  },
  {
    "url": "static/js/1.c2ea60a90f5b8ab433df.js",
    "revision": "0d56731dcd9e35228d653842815c54db"
  },
  {
    "url": "static/js/2.7f2d946d7dff5587a549.js",
    "revision": "48a9bb123722a7be429f1dd60534e252"
  },
  {
    "url": "static/js/5.20433ecd958f6532148f.js",
    "revision": "c5b8d0e8595bc290460ec4ebe3f59edb"
  },
  {
    "url": "static/js/app.de2339c22012806aee3d.js",
    "revision": "76d7ce2862c21767a2d6b35716b7d34e"
  },
  {
    "url": "static/js/manifest.2091ecf0e2eb8ebe8ca8.js",
    "revision": "11965648143547ace8fef3aa52ed8a2f"
  },
  {
    "url": "static/js/vendor.8ea825429446008651cf.js",
    "revision": "aee7a5a36fda45c78377fa6bc0cc426d"
  },
  {
    "url": "sw.js",
    "revision": "d3d62bf0e935c8355401d762c2918a9e"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
]);

