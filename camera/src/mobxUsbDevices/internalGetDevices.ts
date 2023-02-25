import { flow } from 'mobx'
import devices from './devices'

const internalGetDevices = flow(function * () {
  const usbDevices = yield navigator.usb.getDevices()
  devices.set(usbDevices)
})

export default internalGetDevices
