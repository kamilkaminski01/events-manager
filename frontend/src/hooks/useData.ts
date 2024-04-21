import { IServerResponse } from 'models/serverResponse'
import { useCallback, useState } from 'react'
import axiosDefault from 'setup/axios/defaultInstance'
import { parseApiErrors } from 'utils/parseApiErrors'
import { generatePath } from 'react-router-dom'

interface useDataOptions {
  transformGetData: () => void
}

const useData = <T, R = T, C = T>(endpoint: string, { ...options }: useDataOptions) => {
  const [data, setData] = useState<R>()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getData = useCallback(
    async (id?: number | string): Promise<IServerResponse<R>> => {
      try {
        setIsLoading(true)
        setIsError(false)

        const path = id ? endpoint + `${id}/` : endpoint
        const response = await axiosDefault.get(path)

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
      const { transformGetData } = options || {}

      try {
        setIsLoading(true)
        setIsError(false)

        await axiosDefault.post(endpoint, data)

        if (!preventDataRefreshAfterRequest) transformGetData ? transformGetData() : getData()

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
      const { transformGetData } = options || {}

      try {
        setIsLoading(true)
        setIsError(false)

        const path = id ? endpoint + `${id}/` : endpoint

        await axiosDefault.patch(path, data)

        transformGetData ? transformGetData() : getData()

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

  const deleteData = useCallback(
    async (endpoint: string, id: number): Promise<IServerResponse<T>> => {
      const { transformGetData } = options || {}

      try {
        setIsLoading(true)
        setIsError(false)

        const path = generatePath(endpoint, { id: id }) + '/'

        await axiosDefault.delete(path)

        transformGetData ? transformGetData() : getData()

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

  return { data, isLoading, isError, getData, createData, updateData, deleteData, setData }
}

export default useData
