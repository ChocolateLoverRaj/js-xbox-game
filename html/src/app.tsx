import { FC } from 'react'
import Gamepads from './gamepads/Gamepads'
import HeadPortal from './HeadPortal'

const App: FC = () => {
  return (
    <>
      <HeadPortal>
        <title>Gamepad API Demo</title>
      </HeadPortal>
      <Gamepads />
    </>
  )
}

export default App
