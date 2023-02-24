import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { FC, useEffect } from 'react'
import HeadPortal from './HeadPortal'
import SendMessageButton from './SendMessageButton'

const App: FC = () => {
  const { ref, focusKey, focusSelf } = useFocusable()

  useEffect(() => {
    focusSelf()
  }, [focusSelf])

  return (
    <>
      <HeadPortal>
        <title>Gamepad API Demo</title>
      </HeadPortal>
      <FocusContext.Provider value={focusKey}>
        <div ref={ref}>
          <SendMessageButton />
        </div>
      </FocusContext.Provider>
    </>
  )
}

export default App
