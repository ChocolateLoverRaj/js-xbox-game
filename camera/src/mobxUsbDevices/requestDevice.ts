import { flow } from 'mobx'
import devices from './devices'

const requestDevice = flow<USBDevice, [USBDeviceRequestOptions | undefined] | []>(function * (options?: USBDeviceRequestOptions) {
  const device = yield navigator.usb.requestDevice(options)
  devices.set([...devices.get() ?? [], device])
  return device
})

export default requestDevice
