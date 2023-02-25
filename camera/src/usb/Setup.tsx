import { ObservablePromise } from 'mobx-observable-promise'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useMemoOne } from 'use-memo-one'
import UsbContext from './UsbContext'

const Setup = observer(() => {
  const selectedDevice = useContext(UsbContext).get()
  const promise = useMemoOne(() => new ObservablePromise(async () => {
    if (selectedDevice === undefined) return false

    // Open the device.
    await selectedDevice.open()

    // Select the first configuration.
    await selectedDevice.selectConfiguration(1)
    console.log('selected config')

    // Claim the first interface.
    const interfaceNumber = 0
    await selectedDevice.claimInterface(interfaceNumber)
    console.log('claimed interface')

    return true
  }).execute(), [selectedDevice])

  return (
    <div>
      {promise.wasSuccessful
        ? promise.result
          ? 'S'
          : 'Select a device to start streaming'
        : promise.isExecuting
          ? 'Setting up device'
          : 'Error setting up device'}
    </div>
  )
})

export default Setup
