import { FC } from 'react'
import Gamepad from '../gamepad/Gamepad'
import GamepadNull from '../gamepadNull/GamepadNull'
import Props from './Props'

const GamepadOrNull: FC<Props> = ({ gamepad }) => {
  return (
    <div>
      {gamepad !== null
        ? <Gamepad gamepad={gamepad} />
        : <GamepadNull />}
    </div>
  )
}

export default GamepadOrNull
