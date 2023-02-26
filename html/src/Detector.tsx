import { useState } from 'react'
import createFromPromise from 'observables/lib/observablePromise/createFromPromise'
import { setBackend } from '@tensorflow/tfjs-core'
import { createDetector, SupportedModels } from '@tensorflow-models/pose-detection'
import reactObserver from 'observables/lib/reactObserver/reactObserver'
import '@tensorflow/tfjs-backend-webgl'
import Canvas from './Canvas'

const Detector = reactObserver((observe) => {
  const [observablePromise] = useState(() => {
    const observablePromise = createFromPromise((async () => {
      await setBackend('webgl')
      return await createDetector(SupportedModels.MoveNet)
    })())
    return observablePromise
  })
  const promiseData = observe(observablePromise)
  console.log(promiseData)

  return (
    <>
      {promiseData.done
        ? promiseData.result.success
          ? <Canvas detector={promiseData.result.result} />
          : 'Error setting up detector'
        : 'Setting up detector'}
    </>
  )
})

export default Detector
