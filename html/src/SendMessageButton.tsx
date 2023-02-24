import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC } from 'react'
import sendMessage from './sendMessage'
import useOnClick from './useOnClick/useOnClick'

const SendMessageButton: FC = () => {
  const { ref, focused } = useFocusable()
  const onClick = (): void => {
    sendMessage('Message from WebView')
  }
  useOnClick(onClick, focused)

  return (
    <button ref={ref} onClick={onClick}>
      Send message to UWP {focused && 'focused'}
    </button>
  )
}

export default SendMessageButton
