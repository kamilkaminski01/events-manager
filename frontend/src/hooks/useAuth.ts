import { useContext, useState } from 'react'
import { ENDPOINTS, LOCAL_STORAGE, PATHS } from 'utils/consts'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from 'providers/auth/context'
import { ILogin } from 'models/requests/login'
import { IServerResponse } from 'models/serverResponse'
import axiosAuth from 'setup/axios/authInstance'
import { parseApiErrors } from 'utils/parseApiErrors'

const useAuth = () => {
  const { login: loginContext, logout: logoutContext } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const login = async (data: ILogin): Promise<IServerResponse> => {
    try {
      setIsLoading(true)

      const response = await axiosAuth.post(ENDPOINTS.login, {
        username: data.username,
        password: data.password
      })

      localStorage.setItem(LOCAL_STORAGE.accessToken, response.data.access)
      localStorage.setItem(LOCAL_STORAGE.refreshToken, response.data.refresh)

      loginContext()
      navigate(PATHS.home)

      return { succeed: true }
    } catch (error) {
      const serverResponse = parseApiErrors(error)

      setErrorMessage(serverResponse.errorMessage || '')

      return { succeed: false }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE.accessToken)
    localStorage.removeItem(LOCAL_STORAGE.refreshToken)

    logoutContext()
    navigate(PATHS.login)
  }

  return {
    errorMessage,
    isLoading,
    login,
    logout
  }
}

export default useAuth
