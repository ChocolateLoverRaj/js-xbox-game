import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { init, setKeyMap } from '@noriginmedia/norigin-spatial-navigation'

setKeyMap({
  left: [
    37, // LeftArrow
    214, // GamepadLeftThumbstickLeft
    205, // GamepadDPadLeft
    140 // NavigationLeft
  ],
  right: [
    39, // RightArrow
    213, // GamepadLeftThumbstickRight
    206, // GamepadDPadRight
    141 // NavigationRight
  ],
  up: [
    38, // UpArrow
    211, // GamepadLeftThumbstickUp
    203, // GamepadDPadUp
    138 // NavigationUp
  ],
  down: [
    40, // UpArrow
    212, // GamepadLeftThumbstickDown
    204, // GamepadDPadDown
    139 // NavigationDown
  ],
  enter: [
    13, // Enter
    142, // NavigationAccept
    195 // GamepadA
  ]
})
init()

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

const root = createRoot(rootElement)
root.render(<StrictMode><App /></StrictMode>)
