importScripts('workbox-sw.prod.v2.1.0.js');
// importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.5.0/firebase-messaging.js');

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
    "url": "0.16806d7f072dc8822620.hot-update.js",
    "revision": "8408d9c9b976abda2d7f2328b5384d35"
  },
  {
    "url": "0.2b5bc90ae9065c2deec6.hot-update.js",
    "revision": "b0c7c6579202c8ffdfee7278bfaf75ea"
  },
  {
    "url": "0.2e490034b19df224a814.hot-update.js",
    "revision": "26c74aa59fef47847aef7fa86c6419e4"
  },
  {
    "url": "0.3754d1ba3e70c7ceda6a.hot-update.js",
    "revision": "968eef42dd8d7031a23f7b302acff156"
  },
  {
    "url": "0.3fc285322816c8c16c7a.hot-update.js",
    "revision": "fa32f6b40da62182e46cf795e1962b98"
  },
  {
    "url": "0.44e29192000973d1b805.hot-update.js",
    "revision": "194356123a53ddabec9034724d1cf524"
  },
  {
    "url": "0.51d31d82fa72350e8119.hot-update.js",
    "revision": "fe6b8025092481a1d20891eb85da3397"
  },
  {
    "url": "0.5abdb9b502162650c3c4.hot-update.js",
    "revision": "0c961ceabfde716586fafdbe0faa31eb"
  },
  {
    "url": "0.6a72a1949fb3a3714401.hot-update.js",
    "revision": "8591586b0d07e9e10e566acc4e558e85"
  },
  {
    "url": "0.6bb19548ede067c0c357.hot-update.js",
    "revision": "6984597aeb86d15cd99aba46a1364071"
  },
  {
    "url": "0.6ecbcc10004166185dee.hot-update.js",
    "revision": "038e8d3725774c96a9b5c56671391925"
  },
  {
    "url": "0.85d1f5c2ed8a887a6a89.hot-update.js",
    "revision": "8147f5435f97dbf0759cb9f0cdb4e966"
  },
  {
    "url": "0.92c2950e309d0bff052d.hot-update.js",
    "revision": "c56cdc86c5389ee53f19ef41419866e0"
  },
  {
    "url": "0.9e4680989aa7407c0bc9.hot-update.js",
    "revision": "e1c38e435acbb70c6e612323af915be1"
  },
  {
    "url": "0.b82413d50444dc5465de.hot-update.js",
    "revision": "b272348116de5be1ddf726a280f3a6f3"
  },
  {
    "url": "0.bf9293999fc724420282.hot-update.js",
    "revision": "a0cf67200f64f7ba4df908724bdbf8e3"
  },
  {
    "url": "0.c56c6769a81ffe6d652b.hot-update.js",
    "revision": "9c7fac278c77db07d38d783c822a107a"
  },
  {
    "url": "0.c94a67f05b9be76d15d3.hot-update.js",
    "revision": "d927a3a055a733381fe12e693ebea7ec"
  },
  {
    "url": "0.d5afa84ef578a1380c9f.hot-update.js",
    "revision": "403bbabf096d947217977e8ec5ead780"
  },
  {
    "url": "0.dddcdbe53b4282e29d24.hot-update.js",
    "revision": "406b7278d9084cce4e413920c46bf93f"
  },
  {
    "url": "0.e92fbefbc47a5509e367.hot-update.js",
    "revision": "5bb84e47266285eac1b1bbd48d1cf59e"
  },
  {
    "url": "0.ec7783b76d6f47adfe96.hot-update.js",
    "revision": "4bcb23e45336e2ecad2cf42fab39fdb6"
  },
  {
    "url": "0.f13a66c25ca9fa842f85.hot-update.js",
    "revision": "d832f391ec6b6823a1f506566d87a486"
  },
  {
    "url": "0.js",
    "revision": "576a5403f562ce2fe9394d6e5f0c844e"
  },
  {
    "url": "04bfad473698d8e3ac06.worker.js",
    "revision": "cd282c24aefaa29e8c381472b22a688c"
  },
  {
    "url": "068ac1be3db7af4d3692.worker.js",
    "revision": "331acde8872390de7d547c6a7177689f"
  },
  {
    "url": "1.06e81fa5e005aa5e9d78.hot-update.js",
    "revision": "07597a1bff2cc2b18c0b1c7a0824899f"
  },
  {
    "url": "1.1686b23440292a82229a.hot-update.js",
    "revision": "c62cd28e4b8a28c12494c92b59000722"
  },
  {
    "url": "1.1a593d772ef315ce3d01.hot-update.js",
    "revision": "451fa3738c96f830a40017bef8ebbaec"
  },
  {
    "url": "1.1ebf0a81254c6028e6fe.hot-update.js",
    "revision": "d689e1555b0e0a56cb49186fee2ac46b"
  },
  {
    "url": "1.35ad6a8bda8cb9a95241.hot-update.js",
    "revision": "a50d8f7bb21607859577af900f19efab"
  },
  {
    "url": "1.3dd5f50f3dd16d2301c7.hot-update.js",
    "revision": "e35d069d2f0cfd6e5c27cfd1743aa69b"
  },
  {
    "url": "1.496389a7700de08fac44.hot-update.js",
    "revision": "8b6f976b3466e1f39581f62e96740010"
  },
  {
    "url": "1.528a9b38750d1ab87429.hot-update.js",
    "revision": "daaf8693f0d24e3c32c471cb2871fbdf"
  },
  {
    "url": "1.543c49d10ae53495d7f4.hot-update.js",
    "revision": "f62457e2059702dc20fe201816fa0733"
  },
  {
    "url": "1.5450cb5d0ab0c76cf847.hot-update.js",
    "revision": "4b81e6f52295cf5979096db6eb8bab34"
  },
  {
    "url": "1.625abf3a574b910218e8.hot-update.js",
    "revision": "89afa741e0689a9fce2b36cea614c0fd"
  },
  {
    "url": "1.8668219a7946a8f2cbbf.hot-update.js",
    "revision": "24cc6d14be77cac9d5dacf180c4bbaec"
  },
  {
    "url": "1.a0b6d78c61c705c677f4.hot-update.js",
    "revision": "43118eebb4d0304b586e74a47c88a019"
  },
  {
    "url": "1.affdbf865f0e51bbead4.hot-update.js",
    "revision": "716e63a1583c5df383f8bd84b785f19a"
  },
  {
    "url": "1.c6eb076e308513d46888.hot-update.js",
    "revision": "afa2485a67a4b1f920c789d576ae3450"
  },
  {
    "url": "1.c70deb5d5d550669f643.hot-update.js",
    "revision": "b3e44602da664be21ff2cad0b2b824b0"
  },
  {
    "url": "1.c9afe9f245b437f7c341.hot-update.js",
    "revision": "901827b65862a15de20021330273c8a2"
  },
  {
    "url": "1.d26b8810c8f8ddc7c52b.hot-update.js",
    "revision": "e43c857de24434bf9a944ae24a1784b1"
  },
  {
    "url": "1.d38141d30c19f196254e.hot-update.js",
    "revision": "b5ad7a34fa80ae72ba2b8561542824e7"
  },
  {
    "url": "1.d79c37145a0994846140.hot-update.js",
    "revision": "5b09e43b3a8d5ad9a3d70b49d5f69aa0"
  },
  {
    "url": "1.dd6d0addf9e94900ba7d.hot-update.js",
    "revision": "42536751437aef3a57e179e5f90abb4c"
  },
  {
    "url": "1.dee8d6305b881885de8e.hot-update.js",
    "revision": "5f1798f5535f37f7a073f5339e57d85f"
  },
  {
    "url": "1.e470daa5f80a94319edf.hot-update.js",
    "revision": "dc9e7bab09160c101628399a760e3362"
  },
  {
    "url": "1.e4fddccfff4ad7304cfd.hot-update.js",
    "revision": "7f0440c4856ca958521691ee9ff76a29"
  },
  {
    "url": "1.f47da0e2136737e8d06b.hot-update.js",
    "revision": "2a0bc20b40a0eb6dec42a52196dc7fb1"
  },
  {
    "url": "1.fcb186e115166f73b989.hot-update.js",
    "revision": "b48640659740429a1a692e48dd5e4246"
  },
  {
    "url": "1.js",
    "revision": "b09e39a7b770a0198cfd0def622d1c52"
  },
  {
    "url": "16806d7f072dc8822620.worker.js",
    "revision": "f60a5c5a975662381db5372c359771a4"
  },
  {
    "url": "2.js",
    "revision": "c13ae1a42ebee9bfaca8a765a5f4cbe7"
  },
  {
    "url": "2b5bc90ae9065c2deec6.worker.js",
    "revision": "5b99311d60c1357df812d9f8f87d3472"
  },
  {
    "url": "2e490034b19df224a814.worker.js",
    "revision": "aa5f750bf87d3d190bb31e307c8fb5f9"
  },
  {
    "url": "3.6a4e7cdadccf2828fcaf.hot-update.js",
    "revision": "6fc1a108651dee5e0fa4f947a180f99b"
  },
  {
    "url": "3.js",
    "revision": "bda924fb3b616e7ee64a0f76ee9c6e51"
  },
  {
    "url": "3754d1ba3e70c7ceda6a.worker.js",
    "revision": "8c1c2d1ffc38a0b891354a25fba4540d"
  },
  {
    "url": "376a9f090365bbd84fa2.worker.js",
    "revision": "0aa8ab8edaa3550e7287a0b86ed493d3"
  },
  {
    "url": "3fc285322816c8c16c7a.worker.js",
    "revision": "f58b6101c08746e4dc7ed5f05343a1ac"
  },
  {
    "url": "4.6a4e7cdadccf2828fcaf.hot-update.js",
    "revision": "1a1ddb1de93dd129e3c7831c311af42c"
  },
  {
    "url": "44e29192000973d1b805.worker.js",
    "revision": "a959234ae012f498663af773c1ca0a44"
  },
  {
    "url": "5.3bd94aa58c9803a98c5e.hot-update.js",
    "revision": "218cc1d25d33a6449defa94288ea237d"
  },
  {
    "url": "5.8b56aa58257e3b50f95b.hot-update.js",
    "revision": "e00fedf29827524f438159ce87bbf2ae"
  },
  {
    "url": "5.94efea800e5e2317616f.hot-update.js",
    "revision": "0e8db7fd6e4ad0873653091c8ed1d509"
  },
  {
    "url": "5.d019099d2ea68c4a1939.hot-update.js",
    "revision": "5f88b97759c9d50523e6c121dfdd43a4"
  },
  {
    "url": "5.d2c41a6bdbd29e77a8a5.hot-update.js",
    "revision": "0253a087ff2e9eea6c5245f2c528d9a3"
  },
  {
    "url": "5.js",
    "revision": "55a63759ef9a745ce5530b5fb62c8b88"
  },
  {
    "url": "51d31d82fa72350e8119.worker.js",
    "revision": "7128692b0a14da09107c9ecac4b410b7"
  },
  {
    "url": "5abdb9b502162650c3c4.worker.js",
    "revision": "a5434b2d36d05827a28c8a2d564c6995"
  },
  {
    "url": "65a53e4783fc3df83d26.worker.js",
    "revision": "a7dbcbebe5af514cba0aa8f95254db79"
  },
  {
    "url": "6a72a1949fb3a3714401.worker.js",
    "revision": "f08ae03163d1e245ce4f47369e906e27"
  },
  {
    "url": "6bb19548ede067c0c357.worker.js",
    "revision": "c8a97f906223540d8b70c53e0f472806"
  },
  {
    "url": "6ecbcc10004166185dee.worker.js",
    "revision": "3b65d5095d363e37339aa3ecd60c29b4"
  },
  {
    "url": "70c8e6a8d3554813d4c9.worker.js",
    "revision": "e611e666cdc57e65a17bfff0673925a8"
  },
  {
    "url": "82020b53723dbf88903f.worker.js",
    "revision": "dd4ec83318db4f6089307d48c6a34e71"
  },
  {
    "url": "829184cfc6ef70755ca6.worker.js",
    "revision": "edb68aaa17ffddf23d996223c39d1f8a"
  },
  {
    "url": "84f7b5a295c71061b523.worker.js",
    "revision": "3257f566c167a66834274789bd23e636"
  },
  {
    "url": "85d1f5c2ed8a887a6a89.worker.js",
    "revision": "b8c3b6c2c1bce0a62b83df763674e079"
  },
  {
    "url": "92c2950e309d0bff052d.worker.js",
    "revision": "063986473ca4847a29a7ff7299f92ab2"
  },
  {
    "url": "94d8741a57a898d64af9.worker.js",
    "revision": "85eb2c7cc8253d8cf2ca77507452c3ef"
  },
  {
    "url": "9e4680989aa7407c0bc9.worker.js",
    "revision": "ea1cc8917b990c332a9c6fc9fb82ecbc"
  },
  {
    "url": "a63c9fe9110431fcfb67.worker.js",
    "revision": "80f748dac84cdcdbafd50d115586aac2"
  },
  {
    "url": "app.js",
    "revision": "6425a4d6bf2ecf0604b03c19e974b329"
  },
  {
    "url": "b82413d50444dc5465de.worker.js",
    "revision": "64c15a9dc7bc3ee1f22af2f6733f8787"
  },
  {
    "url": "bf9293999fc724420282.worker.js",
    "revision": "29cee127a849c222bf9c6a11bb548032"
  },
  {
    "url": "c56c6769a81ffe6d652b.worker.js",
    "revision": "e21359d42bf8d1820ca888cea63b7962"
  },
  {
    "url": "c94a67f05b9be76d15d3.worker.js",
    "revision": "fa275f94d44b174d982a751d7f82b642"
  },
  {
    "url": "d5afa84ef578a1380c9f.worker.js",
    "revision": "2b7fc73f7fc13337aafaf08189d4a4be"
  },
  {
    "url": "d919370f0741a90f09e5.worker.js",
    "revision": "5e01a076f91a51a50a821d7f9834fddc"
  },
  {
    "url": "dddcdbe53b4282e29d24.worker.js",
    "revision": "711366fb005919dc7cfa8089c8693dbb"
  },
  {
    "url": "e92fbefbc47a5509e367.worker.js",
    "revision": "570787c3d7b0e10eb496c1e9af9bb739"
  },
  {
    "url": "ec7783b76d6f47adfe96.worker.js",
    "revision": "05ccef85007c45ee9b8b9c90ed5b0e2d"
  },
  {
    "url": "f13a66c25ca9fa842f85.worker.js",
    "revision": "8c187a1efbbd72195ae889fd70f9295c"
  },
  {
    "url": "f71f42a88c6b3b721760.worker.js",
    "revision": "777a0a011a2b456ef7a715dc28c9a2df"
  },
  {
    "url": "index.html",
    "revision": "408d47b8945cb2fbfa3a441c17a6be61"
  },
  {
    "url": "manifest.js",
    "revision": "7911dcb8decdb2e3d1d53361ecc90264"
  },
  {
    "url": "static/css/app.05b5529e147e527a4e8d702617450f4b.css",
    "revision": "099fd4e95bdab250166e83d14f648496"
  },
  {
    "url": "static/js/0.5f31091185a438ffca5b.js",
    "revision": "0f226a2c08c3f20ea59b7254fc767067"
  },
  {
    "url": "static/js/1.702bcecb50612eaca7e7.js",
    "revision": "d8e66a3ace25a92fd9f61ec28e0f6639"
  },
  {
    "url": "static/js/2.35836821dd3718cc7d4d.js",
    "revision": "23edf6c02e74628ff7b87287a74e8fdf"
  },
  {
    "url": "static/js/5.126cc14558b6622e7390.js",
    "revision": "afce05dddd6870d4ea44d8500e26de37"
  },
  {
    "url": "static/js/app.3f498f60eaeb71741d8a.js",
    "revision": "faf96489897615479606c928fad96231"
  },
  {
    "url": "static/js/manifest.958c64f5c593541933af.js",
    "revision": "597180c1984b5a064611135ac233986e"
  },
  {
    "url": "static/js/vendor.8ea825429446008651cf.js",
    "revision": "aee7a5a36fda45c78377fa6bc0cc426d"
  },
  {
    "url": "sw.js",
    "revision": "43a9e0f63f02878aecb5b17822aaf838"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
]);
let timerAmount;

const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');

notificationBroadcastChannel.onmessage = ({ data }) => {
  timerAmount = data;

  const notificationPayload = {
    body: 'Timer is up!',
    icon: 'static/images/timer.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [
      { action: 'yes', title: 'Restart Timer', icon: 'status/images/check.png' },
    ],
  };
  this.registration.showNotification('Timer', notificationPayload);
};

const openExistingWindow = (location, clients, timerAmount) => {
  const urlToOpen = new URL(`/#/display/${timerAmount}`, location.origin).href;

  return clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      }

      return clients.openWindow(urlToOpen);
    });
};

self.addEventListener('notificationclick', (event) => {
  const { notification, action } = event;

  if (action === 'yes') {
    restartBroadcastChannel.postMessage('restart');

    event.waitUntil(openExistingWindow(self.location, self.clients, timerAmount));

    notification.close();
  }
});
