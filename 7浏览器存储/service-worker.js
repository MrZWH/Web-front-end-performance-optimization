self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('app-v1')
			.then(function (cache) {
				console.log('open cache')
				return cache.addAll([
					'./app.js',
					'./main.css',
					'./serviceWorker.html'
				])
			})
	)
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (res) {
			if (res) {
				return res
			} else {

			}
		})
	)
})