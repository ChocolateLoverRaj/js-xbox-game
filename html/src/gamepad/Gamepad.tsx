import { FC } from 'react'
import Props from './Props'
import VibrateForm from './VibrateForm'

const Gamepad: FC<Props> = ({ gamepad }) => {
  console.log(gamepad)
  return (
    <>
      Connected gamepad
      <VibrateForm gamepad={gamepad} />
    </>
  )
}

export default Gamepad
