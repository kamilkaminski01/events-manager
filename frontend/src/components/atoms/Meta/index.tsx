import { Helmet } from 'react-helmet-async'
import { MetaProps } from './interface'

const Meta = ({ children }: MetaProps) => {
  return <Helmet>{children}</Helmet>
}

export default Meta
