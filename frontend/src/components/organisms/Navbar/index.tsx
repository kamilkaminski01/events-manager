import { Link } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import './style.scss'
import Button from 'components/atoms/Button'

const Navbar = () => {
  return (
    <nav>
      <Link className="nav__brand" to={PATHS.home}>
        Events Manager
      </Link>
      <div className="nav__menu">
        <Link className="nav__link" to={PATHS.register}>
          <Button className="nav__btn btn--outline">Register</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
