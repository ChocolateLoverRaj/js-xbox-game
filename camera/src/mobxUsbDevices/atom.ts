import { createAtom } from 'mobx'
import devices from './devices'
import internalGetDevices from './internalGetDevices'

const mobxUsbDevicesAtom = createAtom('USB Devices', () => {
  if (devices.get() === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    internalGetDevices()
  }
})

export default mobxUsbDevicesAtom
