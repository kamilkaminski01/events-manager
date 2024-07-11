import { SettingsTileHeaderProps } from './interface'
import './style.scss'
import Button from 'components/atoms/Button'
import { useContext } from 'react'
import { AuthContext } from 'providers/auth/context'

const SettingsTileHeader = ({ title, button }: SettingsTileHeaderProps) => {
  const { isLogged } = useContext(AuthContext)

  return (
    <div className="settings-tile-header">
      <h4 className="settings-tile-header__title">{title}</h4>
      {button && isLogged && (
        <Button className="btn--outline settings-tile-header__btn" onClick={button.onClick}>
          {button.text}
        </Button>
      )}
    </div>
  )
}

export default SettingsTileHeader
