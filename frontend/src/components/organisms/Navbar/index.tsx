import { Link } from 'react-router-dom'
import { PATHS } from 'utils/consts'
import './style.scss'
import Button from 'components/atoms/Button'
import { useContext } from 'react'
import { AuthContext } from 'providers/auth/context'
import useAuth from 'hooks/useAuth'
import classNames from 'classnames'

const Navbar = () => {
  const { isLogged } = useContext(AuthContext)
  const { logout } = useAuth()

  return (
    <nav>
      <div className={classNames('nav__items', { 'single-row': !isLogged })}>
        <Link className="nav__brand" to={PATHS.home}>
          Events Manager
        </Link>
        {isLogged ? (
          <div className="nav__menu">
            <Link className="nav__link" to={PATHS.event}>
              <Button className="nav__btn btn--outline">Create Event</Button>
            </Link>
            <Link className="nav__link" to={PATHS.participant}>
              <Button className="nav__btn btn--outline">Register Participant</Button>
            </Link>
            <Button className="nav__btn btn--outline" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="nav__menu">
            <Link className="nav__link" to={PATHS.login}>
              <Button className="nav__btn btn--outline">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
