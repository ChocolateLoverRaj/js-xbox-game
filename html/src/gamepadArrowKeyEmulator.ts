// Dispatches keyup and keydown events for arrow keys and enter when the first gamepad uses plus pad and A button
let animationFrame: number | undefined
addEventListener('gamepadconnected', () => {
  // Only run loop if it's not already running
  if (animationFrame === undefined) {
    // Left, right, up, down, A
    const pressedButtons = [false, false, false, false, false]
    const keyCodes = [37, 39, 38, 40, 13]
    const buttons = [14, 15, 12, 13, 0]
    const check = (): void => {
      for (let i = 0; i < pressedButtons.length; i++) {
        const pressed = navigator.getGamepads()[0]?.buttons[buttons[i]].pressed ?? false
        if (pressed && !pressedButtons[i]) {
          dispatchEvent(new KeyboardEvent('keydown', { keyCode: keyCodes[i] }))
        } else if (!pressed && pressedButtons[i]) {
          dispatchEvent(new KeyboardEvent('keyup', { keyCode: keyCodes[i] }))
        }
        pressedButtons[i] = pressed
      }
      animationFrame = requestAnimationFrame(check)
    }
    check()
  }
})
addEventListener('gamepaddisconnected', () => {
  cancelAnimationFrame(animationFrame as number)
  animationFrame = undefined
})
