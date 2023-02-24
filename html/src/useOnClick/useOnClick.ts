import { GamepadListener } from 'gamepad.js'
import { useEffect } from 'react'

const useOnClick = (callback: () => void, focused: boolean): void => {
  useEffect(() => {
    if (focused) {
      const listener = new GamepadListener()
      listener.on('gamepad:button', ({ detail: { button, pressed } }) => {
        if (button === 0 && pressed as boolean) callback()
      })
      listener.start()
      return () => {
        listener.stop()
      }
    }
  }, [callback, focused])
}

export default useOnClick
