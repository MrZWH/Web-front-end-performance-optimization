if (navigator.serviceWorker) {
	var sendBtn = document.getElementById('send-msg-button')
	var msgInput = document.getElementById('msg-input')
	var msgBox = document.getElementById('msg-box')

	sendBtn.addEventListener('click', function() {
		// 主页面发送信息到 serviceWorkers
		navigator.serviceWorker.controller.postMessage(msgInput.value)
	})

	navigator.serviceWorker.addEventListener('message', function(event) {
		msgBox.innerHTML += '<li>' + event.data.message + '</li>'
	})

	navigator.serviceWorker.register('./msgsw.js', {scope: './'})
		.then(function (req) {
			console.log(req)
		})
		.catch(function(e) {
			console.log(e)
		})
} else {
	alert('Service Worker is not supported')
}