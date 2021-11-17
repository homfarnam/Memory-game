import { useEffect, useState } from "react"
import { IProps } from "../interfaces/types"

const useFetch = () => {
  const [data, setData] = useState<IProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")

  const fetchData = () => {
    fetch("https://tinyfac.es/api/data?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setData([...data, ...data])

        setTimeout(() => {
          setLoading(false)
        }, 2000)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error }
}

export default useFetch
