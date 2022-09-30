import { useState } from 'react'
import { getDownloadURL, ref, listAll } from 'firebase/storage'
import { storage } from '../firebaseConfig'

const GetFileFromStorage: React.FC = () => {
  const [data, setData] = useState<any>([])

  const handleSubmit = () => {
    const storageRef = ref(storage, '')
    listAll(storageRef)
      .then((res) => {
        const arrayUrl: Promise<string>[] = []
        res.items.forEach((item) => {
          arrayUrl.push(getDownloadURL(ref(storage, item.name)))
        })
        Promise.all(arrayUrl).then((res) => {
          setData(res)
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <>
      <div className='container'>
        <button onClick={handleSubmit}>Get File</button>
        <br />
        {data.map((url: string, index: number) => {
          return <img src={url} alt='' style={{ width: '300px', height: '250px' }} key={index} />
        })}
      </div>
    </>
  )
}

export default GetFileFromStorage
