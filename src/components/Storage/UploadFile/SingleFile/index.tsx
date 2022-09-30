import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'
import { storage } from '../../firebaseConfig'

const UploadSingleFile: React.FC = () => {
  const [data, setData] = useState<any>({})

  const handleSubmit = () => {
    const storageRef = ref(storage, data.name)
    const uploadTask = uploadBytesResumable(storageRef, data)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Uploading... ${Math.floor(progress)}%`)
      },
      (error) => {
        console.log(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Link File:', downloadURL)
        })
      }
    )
  }

  return (
    <>
      <div className='container'>
        <input type='file' onChange={(e) => e.target.files?.length && setData(e.target.files[0])} />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default UploadSingleFile
