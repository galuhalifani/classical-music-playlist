// import { useState, useEffect } from 'react'

// export default function useApi(url) {
//   console.log('use API!!', url)
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(false)

//     useEffect(() => {
//       if (url) {
//         setLoading(true)
//         fetch(`${url}`)
//         .then(response => response.json())
//         .then(data => {
//           setData(data)
//           console.log(`BERHASIL FETCH ${url}`)
//         })
//         .catch(err => {
//           console.log(err)
//           setError(true)
//         })
//         .finally(() => setLoading(false))
//       }
//     }, [url])

//     return {
//         data,
//         loading,
//         error
//     }
// }