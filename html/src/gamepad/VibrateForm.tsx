import { FC } from 'react'
import Props from './Props'
import Form from '@rjsf/core'

const VibrateForm: FC<Props> = ({ gamepad }) => {
  return (
    <>
      <Form
        schema={{
          type: 'object',
          properties: {
            duration: { type: 'number', minimum: 0 },
            startDelay: { type: 'number', minimum: 0 },
            strongMagnitude: { type: 'number', minimum: 0, maximum: 1 },
            weakMagnitude: { type: 'number', minimum: 0, maximum: 1 }
          },
          required: ['duration', 'startDelay', 'strongMagnitude', 'weakMagnitude']
        }}
        onSubmit={({ formData }) => {
          (gamepad as any).vibrationActuator.playEffect('dual-rumble', formData)
        }}
        formData={{
          duration: 2000,
          startDelay: 0,
          strongMagnitude: 1,
          weakMagnitude: 1
        }}
      >
        <button type='submit'>Vibrate</button>
      </Form>
      <button
        onClick={() => {
          (gamepad as any).vibrationActuator.playEffect('dual-rumble', {
            duration: 0,
            startDelay: 0,
            strongMagnitude: 0,
            weakMagnitude: 0
          })
        }}
      >
        Stop
      </button>
    </>
  )
}

export default VibrateForm
