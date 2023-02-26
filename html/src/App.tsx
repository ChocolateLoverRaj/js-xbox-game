import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC, useEffect } from 'react'
import { useLocalstorageState } from 'rooks'
import Detector from './Detector'
import HeadPortal from './HeadPortal'
import IpAddressContext from './IpAddressContext'
import IpCamera from './ipCamera/IpCamera'
import SendMessageButton from './SendMessageButton'

const App: FC = () => {
  const address = useLocalstorageState<string>('ipCameraAddress', '192.168.1.217:8080')
  const { ref, focusKey, focusSelf } = useFocusable()

  useEffect(() => {
    focusSelf()
  }, [focusSelf])

  return (
    <>
      <HeadPortal>
        <title>Pose Detection for Xbox</title>
      </HeadPortal>
      <FocusContext.Provider value={focusKey}>
        <IpAddressContext.Provider value={address as any}>
          <div ref={ref}>
            <SendMessageButton />
            <IpCamera />
            <Detector />
          </div>
        </IpAddressContext.Provider>
      </FocusContext.Provider>
    </>
  )
}

export default App
