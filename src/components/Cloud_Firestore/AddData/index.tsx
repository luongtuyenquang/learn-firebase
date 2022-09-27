import { ChangeEvent, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { database } from './firebaseConfig'

interface InputProps {
  email: string
  password: string
}
const AddData: React.FC = () => {
  const [data, setData] = useState<InputProps>({ email: '', password: '' })

  const handleSubmit = () => {
    addDoc(collection(database, 'users'), {
      email: data.email,
      password: data.password,
    })
      .then(() => {
        setData({ email: '', password: '' })
      })
      .catch((error) => error.message)
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
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}
export default AddData
