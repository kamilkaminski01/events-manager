export interface SelectProps {
  name: string
  options: { value: string | number; text: string }[]
  defaultValue?: string | number | readonly string[] | undefined
  defaultOption?: { value: string | number; text: string } | null
  blankOption?: boolean
}
