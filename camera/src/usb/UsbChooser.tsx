import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import getDevices from '../mobxUsbDevices/getDevices'
import UsbContext from './UsbContext'
import { action } from 'mobx'
import never from 'never'

const UsbChooser = observer(() => {
  const mobxSelectedDevice = useContext(UsbContext)
  const selectedDevice = mobxSelectedDevice.get()
  const getKey = (device: USBDevice): string => `${device.vendorId}.${device.productId}`
  const getDevice = (id: string): USBDevice => {
    const [vendorId, productId] = id.split('.').map(Number)
    return getDevices().find(device => device.vendorId === vendorId && device.productId === productId) ?? never()
  }

  return (
    <>
      <select
        value={selectedDevice !== undefined ? getKey(selectedDevice) : 'none'}
        onChange={action(({ target: { value } }) => {
          if (value === 'none') {
            mobxSelectedDevice.set(undefined)
          } else {
            mobxSelectedDevice.set(getDevice(value))
          }
        })}
      >
        <option key='none' value='none'>None</option>
        {getDevices().map(device => (
          <option key={getKey(device)} value={getKey(device)}>{device.productName}</option>
        ))}
      </select>
    </>
  )
})

export default UsbChooser
