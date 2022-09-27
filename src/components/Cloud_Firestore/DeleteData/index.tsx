import { deleteDoc, doc } from 'firebase/firestore'
import { database } from './firebaseConfig'

const DeleteData: React.FC = () => {
  const handleSubmit = () => {
    deleteDoc(doc(database, 'users', 'VU4uFMnwQxn9HRkCIpPR'))
      .then(() => console.log('Delete data successfully !'))
      .catch(() => console.log('Delete data fail !'))
  }

  return (
    <>
      <div className='container'>
        <button onClick={handleSubmit}>Delete</button>
      </div>
    </>
  )
}
export default DeleteData
