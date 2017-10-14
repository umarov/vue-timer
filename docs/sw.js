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
    "revision": "c5e76166b9e5a1f7a4454f2bb6c09f40"
  },
  {
    "url": "static/css/app.72b36e31879f0cf26ac95ec3706e9333.css",
    "revision": "c36a2daad244fa1fce13a9609fa1d6f6"
  },
  {
    "url": "static/js/0.0dd47f8e7b012f570541.js",
    "revision": "14e7575fcc79ba8f2247850a4673bd2c"
  },
  {
    "url": "static/js/1.0fc292535d26f6e99661.js",
    "revision": "7516754626915d752ec2d644efea3efe"
  },
  {
    "url": "static/js/2.a4e326554f5ea2e7f215.js",
    "revision": "6de4b7c0ab92dbfa4e1e7e33f7ceb2f6"
  },
  {
    "url": "static/js/app.15ad61c7078da14babcc.js",
    "revision": "7ed70e7685f3895da71209544b9d55c1"
  },
  {
    "url": "static/js/manifest.957920914ce849e8932c.js",
    "revision": "0ab2d10fee6d614409319e38cb20712f"
  },
  {
    "url": "static/js/vendor.8ea825429446008651cf.js",
    "revision": "aee7a5a36fda45c78377fa6bc0cc426d"
  },
  {
    "url": "sw.js",
    "revision": "41fe2602c1a67ac02a312e32a34c9a96"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
]);

