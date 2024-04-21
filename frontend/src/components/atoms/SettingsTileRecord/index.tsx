import classNames from 'classnames'
import { SettingsTileRecordProps } from './interface'
import './style.scss'

const SettingsTileRecord = ({
  label,
  value,
  secondValue,
  button,
  className
}: SettingsTileRecordProps) => {
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
    <div className={classNames('settings-tile-record', className)}>
      <label className="settings-tile-record__label">{label}</label>
      <div
        className={classNames('settings-tile-record__value', {
          'settings-tile-record__value--bold': secondValue
        })}>
        {renderValue()}
      </div>

      {secondValue && (
        <span className="settings-tile-record__value settings-tile-record__value--second">
          {secondValue}
        </span>
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
