import { ChangeEvent, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { database } from './firebaseConfig'

interface InputProps {
  id?: string
  email: string
  password: string
}
const ReadData: React.FC = () => {
  const [data, setData] = useState<InputProps>({ email: '', password: '' })
  const [user, setUser] = useState([])

  const handleSubmit = () => {
    getDocs(collection(database, 'users')).then((res) =>
      console.log(
        res.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })
      )
    )
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
export default ReadData
