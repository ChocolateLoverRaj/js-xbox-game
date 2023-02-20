import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC } from 'react'
import Props from './Props'

const StopButton: FC<Props> = ({ gamepad }) => {
  const onClick = (): void => {
    gamepad.vibrationActuator.playEffect('dual-rumble', {
      duration: 0,
      startDelay: 0,
      strongMagnitude: 0,
      weakMagnitude: 0
    })
  }

  const { ref, focused } = useFocusable({
    onEnterPress: onClick
  })

  return (
    <button
      ref={ref}
      onClick={onClick}
    >
      Stop {focused && 'focused'}
    </button>
  )
}

export default StopButton
