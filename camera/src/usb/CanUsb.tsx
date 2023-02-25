import { observable } from 'mobx'
import { FC, useState } from 'react'
import AddDevice from './AddDevice'
import Setup from './Setup'
import TUsbContext from './TUsbContext'
import UsbChooser from './UsbChooser'
import UsbContext from './UsbContext'

const CanUsb: FC = () => {
  const [contextValue] = useState<TUsbContext>(() => observable.box(undefined))

  return (
    <>
      <UsbContext.Provider value={contextValue}>
        <UsbChooser />
        <AddDevice />
        <Setup />
      </UsbContext.Provider>
    </>
  )
}

export default CanUsb
