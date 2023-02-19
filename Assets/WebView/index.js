console.log('JavaScript loaded')

document.getElementById("button").addEventListener("click", () => {
    window.external.notify("Message From Webview")
})

window.chrome.webview.addEventListener('message', ({data}) => {
    alert(data);
});