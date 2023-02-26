import { FC, useContext } from 'react'
import FocusableInput from '../FocusableInput'
import IpAddressContext from '../IpAddressContext'

const IpCamera: FC = () => {
  const [address, setAddress] = useContext(IpAddressContext)

  // TODO: Add settings for video size and quality

  return (
    <section>
      <h2>IP Camera</h2>
      <label>
        IP Address
        <FocusableInput
          type='text'
          value={address}
          onChange={({ target: { value } }) => setAddress(value)}
        />
      </label><br />
    </section>
  )
}

export default IpCamera
