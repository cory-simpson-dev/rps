import { Link } from 'react-router-dom'

const UserButton = ({url, user}) => {
  return (
    <Link to={url} className='btn btn-reverse btn-sm'>
        View User {user}
    </Link>
  )
}

export default UserButton