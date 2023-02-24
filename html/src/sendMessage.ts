const sendMessage = (message: string): void => {
  if (typeof window.chrome !== 'undefined' && typeof window.chrome.webview !== 'undefined') {
    window.chrome.webview.postMessage(message)
  } else if ('notify' in window.external /* typeof window.external.notify doesn't work in the old WebView */) {
    window.external.notify(message)
  } else {
    throw new Error("Can't send message")
  }
}

export default sendMessage
