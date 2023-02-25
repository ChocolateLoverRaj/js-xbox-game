import { Context, createContext } from 'react'
import TUsbContext from './TUsbContext'

const UsbContext = createContext(undefined as any) as Context<TUsbContext>

export default UsbContext
