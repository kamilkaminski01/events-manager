export interface AuthContextProps {
  isLogged: boolean
  login: () => void
  logout: () => void
}
