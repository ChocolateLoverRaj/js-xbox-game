
import { SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation'

declare module '@noriginmedia/norigin-spatial-navigation' {
  const SpatialNavigation: any
}

// Dispatches keyup and keydown events for arrow keys and enter when the first gamepad uses plus pad and A button
let animationFrame: number | undefined
addEventListener('gamepadconnected', () => {
  // Only run loop if it's not already running
  if (animationFrame === undefined) {
    const directions = ['left', 'right', 'up', 'down']
    const buttons = [14, 15, 12, 13]
    const pressedButtons = [false, false, false, false]
    const check = (): void => {
      for (let i = 0; i < directions.length; i++) {
        const pressed = navigator.getGamepads()[0]?.buttons[buttons[i]].pressed ?? false
        if (pressed && !pressedButtons[i]) {
          SpatialNavigation.navigateByDirection(directions[i])
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
