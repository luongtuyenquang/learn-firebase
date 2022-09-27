import { signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth'
import { useState } from 'react'
import { auth } from './firebaseConfig'

const AuthenticationByGithub: React.FC = () => {
  const provider = new GithubAuthProvider()
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
        <button onClick={handleClickLogin}>Đăng nhập bằng Github</button>
      )}
    </>
  )
}
export default AuthenticationByGithub
