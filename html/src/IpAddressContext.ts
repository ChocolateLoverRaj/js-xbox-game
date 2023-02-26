import { createContext } from 'react'

const IpAddressContext = createContext<[string, (value: string) => void]>(undefined as any)

export default IpAddressContext
