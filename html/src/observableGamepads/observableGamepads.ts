import wrapGetObservable from 'observables/lib/wrapGetObservable/wrapGetObservable'

const observableGamepads = wrapGetObservable<Array<Gamepad | null>>({
  getValue: () => navigator.getGamepads(),
  getInternalObserve: triggerUpdate => {
    const listener: EventListener = () => triggerUpdate()
    return {
      add: () => {
        addEventListener('gamepadconnected', listener)
        addEventListener('gamepaddisconnected', listener)
      },
      remove: () => {
        removeEventListener('gamepadconnected', listener)
        removeEventListener('gamepaddisconnected', listener)
      }
    }
  }
})

export default observableGamepads
