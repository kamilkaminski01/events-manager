import { EMealType } from 'models/mealType'

export interface SettingsTileRecordProps {
  label: string
  value?: string | number | EMealType[]
  link?: { to: string; text: string }
  button?: {
    text: string
    onClick: () => void
  }
  className?: string
}
