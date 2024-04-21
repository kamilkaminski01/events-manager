import { EMealType } from 'models/mealType'

export interface SettingsTileRecordProps {
  label: string
  value: string | number | EMealType[]
  secondValue?: string
  className?: string
  button?: {
    text: string
    onClick: () => void
  }
}
