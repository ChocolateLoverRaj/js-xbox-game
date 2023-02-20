import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

const HeadPortal: FC<PropsWithChildren> = ({ children }) => createPortal(children, document.head)

export default HeadPortal
