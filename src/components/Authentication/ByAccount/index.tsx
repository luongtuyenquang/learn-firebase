import { ChangeEvent, useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './firebaseConfig'

interface InputProps {
  email: string
  password: string
}
const Authentication: React.FC = () => {
  const [data, setData] = useState<InputProps>({ email: '', password: '' })
  const [user, setUser] = useState<any>({})

  const handleSubmit = () => {
    // createUserWithEmailAndPassword
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => setUser(res.user))
      .catch((error) => console.log(error.message))
    setData({ email: '', password: '' })
  }

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUser('')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <>
      {user.email ? (
        <div>
          <h1 style={{ fontSize: '2rem' }}>Email: {user.email}</h1>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
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
      )}
    </>
  )
}
export default Authentication
