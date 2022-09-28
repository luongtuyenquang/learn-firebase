import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebaseConfig'

const UploadMultiFile: React.FC = () => {
  const [data, setData] = useState<any>([])

  const handleSubmit = () => {
    const listFile = Array.from(data)
    listFile.map((file: any, index) => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          console.log(`File thứ ${index + 1} Uploading... ${progress}%`)
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
    })
  }

  return (
    <>
      <div className='container'>
        <input
          type='file'
          onChange={(e) => e.target.files?.length && setData(e.target.files)}
          multiple
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default UploadMultiFile
