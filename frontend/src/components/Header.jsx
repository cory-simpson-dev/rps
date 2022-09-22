import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // get user from state
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  
  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {/* if user exists,  this or that */}
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
          </li>
        ) : (
          // need fragment to return single element (two list items in fragment)
          <>
            <li>
              <Link to='/login'>
              <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
              <FaUser /> Register
              </Link>
            </li>
          </>
        )}
        
      </ul>
    </header>
  )
}

export default Header