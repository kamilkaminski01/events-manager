import { Helmet } from 'react-helmet'
import { MetaProps } from './interface'

const Meta = ({ children }: MetaProps) => {
  return <Helmet>{children}</Helmet>
}

export default Meta
