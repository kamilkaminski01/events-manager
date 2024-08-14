import { IServerResponse } from 'models/serverResponse'
import axiosAuth from 'setup/axios/authInstance'
import { ENDPOINTS, LOCAL_STORAGE } from './consts'

export const refreshToken = async (): Promise<IServerResponse> => {
  try {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE.refreshToken)
    const response = await axiosAuth.post(
      ENDPOINTS.refreshToken,
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } }
    )

    localStorage.setItem(LOCAL_STORAGE.accessToken, response.data.access)

    return { succeed: true }
  } catch (error) {
    return { succeed: false }
  }
}
