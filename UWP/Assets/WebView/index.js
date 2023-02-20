console.log('JavaScript loaded')

document.getElementById("button").addEventListener("click", () => {
    // window.external.notify("Message From Webview")
    // window.external.notify("HI")
    const gamePads = navigator.getGamepads()
    window.external.notify(`Buttons, ${JSON.stringify(gamePads)}`)
})


addEventListener("gamepadconnected", (e) => {
    const gamePads = navigator.getGamepads()
    window.external.notify(`Buttons, ${JSON.stringify(gamePads)}`)
    document.body.style.backgroundColor = 'red'
})

document.getElementById("button").style.fontSize = '100px'