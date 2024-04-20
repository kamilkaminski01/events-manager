import './style.scss'
import { SelectProps } from './interface'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'

const Select = ({
  name,
  options,
  defaultValue,
  defaultOption,
  blankOption = false
}: SelectProps) => {
  const { register } = useFormContext()

  return (
    <select
      id={name}
      data-testid={name}
      defaultValue={defaultValue ? defaultValue : undefined}
      className={classNames('select', {
        'select__option--disabled': options.length === 0
      })}
      {...register(name)}>
      {defaultOption && <option value={defaultOption.value}>{defaultOption.text}</option>}
      {blankOption && <option>-</option>}
      {options.length ? (
        options.map((option, key) => (
          <option value={option.value} key={key}>
            {option.text}
          </option>
        ))
      ) : (
        <option className="select__option--disabled">No more participants can be hosts</option>
      )}
    </select>
  )
}

export default Select