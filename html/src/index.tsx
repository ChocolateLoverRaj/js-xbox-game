import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { init } from '@noriginmedia/norigin-spatial-navigation'
import './navigateWithGamepad'

init()

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

const root = createRoot(rootElement)
root.render(<StrictMode><App /></StrictMode>)
