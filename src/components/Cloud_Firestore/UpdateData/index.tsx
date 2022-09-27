import { ChangeEvent, useState } from 'react'
import { updateDoc, doc } from 'firebase/firestore'
import { database } from './firebaseConfig'

interface InputProps {
  id?: string
  email: string
  password: string
}
const UpdateData: React.FC = () => {
  const [data, setData] = useState<InputProps>({ email: '', password: '' })

  const handleSubmit = () => {
    updateDoc(doc(database, 'users', 'VU4uFMnwQxn9HRkCIpPR'), {
      email: data.email,
      password: data.password,
    })
      .then(() => console.log('Update data successfully !'))
      .catch(() => console.log('Update data fail !'))
  }

  return (
    <>
      <div className='container'>
        <input
          type='text'
          placeholder='Email'
          value={data.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, email: e.target.value })
          }
        />
        <input
          type='password'
          placeholder='Password'
          value={data.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setData({ ...data, password: e.target.value })
          }
        />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </>
  )
}
export default UpdateData
