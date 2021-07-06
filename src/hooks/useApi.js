import { useState, useEffect } from 'react'

export default function useApi() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch("https://v1.nocodeapi.com/galuhalifani/spotify/rGPSdDBWgbWtmwxO/browse/categoryPlaylist?category_id=classical")
        .then(response => response.json())
        .then(data => {
          setData(data)
          console.log(data.playlists.items)
        })
        .catch(err => {
          console.log(err)
          setError(true)
        })
        .finally(() => setLoading(false))
      }, [])

    return {
        data,
        loading,
        error
    }
}