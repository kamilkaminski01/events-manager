import { SettingsTileRecordProps } from './interface'
import './style.scss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

const SettingsTileRecord = ({ label, value, link, button, className }: SettingsTileRecordProps) => {
  const renderValue = () => {
    if (!value || (typeof value !== 'number' && value.length === 0)) {
      return <span>-</span>
    } else if (Array.isArray(value)) {
      return <span>{value.join(', ')}</span>
    } else {
      return <span>{value}</span>
    }
  }

  return (
    <div className="settings-tile-record">
      <label className={classNames('settings-tile-record__label', className)}>{label}</label>
      {!link && <div className="settings-tile-record__value">{renderValue()}</div>}
      {link && (
        <Link to={link.to} className="settings-tile-record__value link">
          {link.text}
        </Link>
      )}

      {button && (
        <span className="settings-tile-record__btn" onClick={button.onClick}>
          {button.text}
        </span>
      )}
    </div>
  )
}

export default SettingsTileRecord
