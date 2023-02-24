declare global {
  interface Window {
    chrome?: {
      webview: {
        postMessage: (message: string) => void
      }
    }
  }

  interface External {
    notify: (message: string) => void
  }
}

export {}
