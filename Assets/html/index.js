console.log('JavaScript loaded')

document.getElementById("button").addEventListener("click", () => {
	chrome.webview.postMessage("Message From Webview2")
})
