import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC } from 'react'

const VibrateButton: FC = () => {
  const { ref, focused } = useFocusable({
    onEnterPress: () => {
      console.log('click!');
      (ref.current as HTMLButtonElement).click()
    }
  })

  return (
    <button type='submit' ref={ref}>Vibrate {focused && 'focused'}</button>
  )
}

export default VibrateButton
