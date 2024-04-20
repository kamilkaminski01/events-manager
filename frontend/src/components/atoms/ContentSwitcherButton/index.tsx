import classNames from 'classnames'
import { ContentSwitcherButtonProps } from './interface'
import './style.scss'

const ContentSwitcherButton = ({ children, isActive, onClick }: ContentSwitcherButtonProps) => {
  return (
    <button
      className={classNames('content-switcher-button', {
        'content-switcher-button--active': isActive
      })}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default ContentSwitcherButton
