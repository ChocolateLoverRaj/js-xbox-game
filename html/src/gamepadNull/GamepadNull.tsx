import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC, useEffect } from 'react'

const GamepadNull: FC = () => {
  const { ref, focusSelf, focused } = useFocusable()

  useEffect(() => {
    console.log('f')
    focusSelf()
  }, [focusSelf])

  return (
    <div ref={ref}>
      Not-connected gamepad {focused && 'focused'}
    </div>
  )
}

export default GamepadNull
