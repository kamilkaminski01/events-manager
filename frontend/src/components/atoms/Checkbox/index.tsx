import { useFormContext } from 'react-hook-form'
import { CheckboxProps } from './interface'
import './style.scss'

const Checkbox = ({ children, name, defaultValue }: CheckboxProps) => {
  const { register } = useFormContext()

  return (
    <label className="checkbox-wrapper">
      <input
        className="checkbox-wrapper__checkbox"
        data-testid={name}
        type="checkbox"
        defaultChecked={defaultValue}
        {...register(name)}
      />
      <span className="checkbox-wrapper__indicator" />
      <p className="checkbox-wrapper__content">{children}</p>
    </label>
  )
}

export default Checkbox
