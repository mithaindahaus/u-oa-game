// Lưu toàn bộ game vào máy để chơi được khi không có mạng
const CACHE = 'u-oa-v1';
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-512.png", "img/bear.webp", "img/cat.webp", "img/chick.webp", "img/cow.webp", "img/crab.webp", "img/dog.webp", "img/dolphin.webp", "img/duck.webp", "img/elephant.webp", "img/fish.webp", "img/frog.webp", "img/giraffe.webp", "img/goat.webp", "img/horse.webp", "img/lion.webp", "img/monkey.webp", "img/octopus.webp", "img/panda.webp", "img/pig.webp", "img/rooster.webp", "img/sheep.webp", "img/tiger.webp", "img/water-buffalo.webp", "img/whale.webp", "img/zebra.webp", "snd/bear.mp3", "snd/bubbles.mp3", "snd/cat.mp3", "snd/chick.mp3", "snd/cow.mp3", "snd/dog.mp3", "snd/dolphin.mp3", "snd/duck.mp3", "snd/elephant.mp3", "snd/frog.mp3", "snd/goat.mp3", "snd/horse.mp3", "snd/lion.mp3", "snd/monkey.mp3", "snd/pig.mp3", "snd/rooster.mp3", "snd/sheep.mp3", "snd/tiger.mp3", "snd/water-buffalo.mp3", "snd/whale.mp3", "snd/zebra.mp3"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('index.html'))));
});
