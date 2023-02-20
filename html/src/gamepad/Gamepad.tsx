import { FC } from 'react'
import Props from './Props'
import VibrateForm from './VibrateForm'
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation'

const Gamepad: FC<Props> = ({ gamepad }) => {
  const { ref, focusKey } = useFocusable()

  console.log(gamepad)
  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref}>
        Connected gamepad
        <VibrateForm gamepad={gamepad} />
      </div>
    </FocusContext.Provider>
  )
}

export default Gamepad
