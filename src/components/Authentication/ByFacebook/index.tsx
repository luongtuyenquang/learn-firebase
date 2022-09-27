import { FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth } from './firebaseConfig'

const AuthenticationByFacebook: React.FC = () => {
  const provider = new FacebookAuthProvider()
  const [user, setUser] = useState<any>({})

  const handleClickLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        setUser(res.user)
      })
      .catch((error) => {
        console.log(error.message)
      })
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
      {user.displayName ? (
        <div>
          <div>
            <img src={user.photoURL} alt='Image' />
          </div>
          <p>Tên: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      ) : (
        <button onClick={handleClickLogin}>Đăng nhập bằng Facebook</button>
      )}
    </>
  )
}
export default AuthenticationByFacebook
