import { IServerResponse } from 'models/serverResponse'
import { useCallback, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { parseApiErrors } from 'utils/parseApiErrors'

const useData = <T, R = T, C = T>(endpoint: string) => {
  const [data, setData] = useState<R>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getData = useCallback(
    async (): Promise<IServerResponse<R>> => {
      try {
        setIsLoading(true)
        setIsError(false)

        const response = await axiosDefault.get(endpoint)

        const responseData = response.data
        setData(responseData)

        return { succeed: true, data: responseData }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        setIsLoading(false)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint]
  )

  const createData = useCallback(
    async (
      data: C,
      requestOptions?: { preventDataRefreshAfterRequest?: boolean }
    ): Promise<IServerResponse<T>> => {
      const { preventDataRefreshAfterRequest } = requestOptions || {}

      try {
        setIsLoading(true)
        setIsError(false)

        await axiosDefault.post(endpoint, data)

        if (!preventDataRefreshAfterRequest) getData()

        return { succeed: true }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, getData]
  )

  const updateData = useCallback(
    async (data: Partial<T>, id?: number): Promise<IServerResponse<T>> => {
      try {
        setIsLoading(true)
        setIsError(false)

        const path = id ? endpoint + `${id}/` : endpoint

        await axiosDefault.patch(path, data)

        getData()

        return { succeed: true }
      } catch (error) {
        setIsError(true)

        return parseApiErrors(error)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, getData]
  )

  return { data, isLoading, isError, getData, createData, updateData, setData }
}

export default useData
