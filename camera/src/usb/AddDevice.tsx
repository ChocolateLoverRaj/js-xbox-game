import { FC, useState } from 'react'
import requestDevice from '../mobxUsbDevices/requestDevice'

const AddDevice: FC = () => {
  const [error, setError] = useState<Error>()

  return (
    <>
      <button
        onClick={() => {
          setError(undefined)
          requestDevice({ filters: [] }).catch(e => {
            setError(e)
          })
        }}
      >
        Add device
      </button>
      {error?.message}
    </>
  )
}

export default AddDevice
