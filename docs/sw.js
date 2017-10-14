importScripts('workbox-sw.prod.v2.1.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "a63c9fe9110431fcfb67.worker.js",
    "revision": "80f748dac84cdcdbafd50d115586aac2"
  },
  {
    "url": "index.html",
    "revision": "97c02bae709a41d7c1dcf5e681ace5ca"
  },
  {
    "url": "static/css/app.313da12e54b733b8d3fd7726dc86dfc0.css",
    "revision": "3da40477bdc78a62d870602f03468303"
  },
  {
    "url": "static/js/app.d895e6a51357495c410f.js",
    "revision": "df1f4c324c0e69d5e7789eb4d1be45f6"
  },
  {
    "url": "static/js/manifest.f539458008177e2d403d.js",
    "revision": "0ce7d8ff5c40e9d50d38fe8882e17a6a"
  },
  {
    "url": "static/js/vendor.fd51db52efbaf092466a.js",
    "revision": "d12c47dd2c108964e2f574a1be716928"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
