import { useState } from 'react'
import { getDownloadURL, ref, listAll, deleteObject } from 'firebase/storage'
import { storage } from '../firebaseConfig'

const DeleteFile: React.FC = () => {
  const [arrayName, setArrayName] = useState<any>([])
  const [data, setData] = useState<any>([])

  const handleSubmit = () => {
    const storageRef = ref(storage, '')
    listAll(storageRef)
      .then((res) => {
        const arrayUrl: Promise<string>[] = []
        const arrayName: Promise<string>[] = []
        res.items.forEach((item: any) => {
          arrayName.push(item.name)
          arrayUrl.push(getDownloadURL(ref(storage, item.name)))
        })
        Promise.all(arrayUrl).then((res) => {
          setData(res)
        })
        Promise.all(arrayName).then((res) => {
          setArrayName(res)
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const handleDeleteFile = (name: string) => {
    const desertRef = ref(storage, name)
    deleteObject(desertRef)
      .then(() => {
        console.log('Delete file successfully !')
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
        {data.map((url: string, indexUrl: number) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }} key={indexUrl}>
              <img src={url} alt='' style={{ width: '300px', height: '250px' }} />
              {arrayName.map((name: string, indexName: number) => {
                if (indexUrl === indexName) {
                  return (
                    <button onClick={() => handleDeleteFile(name)} key={indexName}>
                      Xóa
                    </button>
                  )
                }
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DeleteFile
