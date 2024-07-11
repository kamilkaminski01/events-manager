import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react'
import { AuthContext } from 'providers/auth/context'
import { LOCAL_STORAGE } from 'utils/consts'

const accessToken = localStorage.getItem(LOCAL_STORAGE.accessToken)

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!accessToken)

  const login = useCallback(async () => {
    setIsLogged(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = () => {
    setIsLogged(false)
  }

  useEffect(() => {
    if (accessToken) {
      login()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <AuthContext.Provider value={{ isLogged, login, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
