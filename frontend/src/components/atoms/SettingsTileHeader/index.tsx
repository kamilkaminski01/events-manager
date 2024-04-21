import { SettingsTileHeaderProps } from './interface'
import './style.scss'
import Button from 'components/atoms/Button'

const SettingsTileHeader = ({ title, button }: SettingsTileHeaderProps) => {
  return (
    <div className="settings-tile-header">
      <h4 className="settings-tile-header__title">{title}</h4>
      {button && (
        <Button className="btn--outline settings-tile-header__btn" onClick={button.onClick}>
          {button.text}
        </Button>
      )}
    </div>
  )
}

export default SettingsTileHeader
