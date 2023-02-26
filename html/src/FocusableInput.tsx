import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

const FocusableInput: FC<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = props => {
  const { ref } = useFocusable()

  return (
    <input ref={ref} {...props} />
  )
}

export default FocusableInput
