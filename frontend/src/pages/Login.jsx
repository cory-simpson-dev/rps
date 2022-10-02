import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
// useSelector allows us to select from global state (i.e. user, isSuccess value, message)
// useDispatch dispatches actions (i.e. register)
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    // instead of separate states for every field, use formData
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // destructure formData
    const { email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // use name ('auth') that is same as state (see auth/authSlice.js authSlice)
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

    useEffect(() => {
      if(isError) {
          toast.error(message)
      }

      // redirect when logged in
      if(isSuccess || user) {
          navigate('/')
      }

      dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
          email,
          password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
      return <Spinner />
    }

    return (
      <>
        <section className="heading">
            <h1>
                Login
            </h1>
            <p>Please log in</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="email" 
                    className="form-control" 
                    id='email' 
                    name='email'
                    value={email} 
                    onChange={onChange} 
                    placeholder='Enter your email'
                    required
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    id='password' 
                    name='password'
                    value={password} 
                    onChange={onChange} 
                    placeholder='Enter password'
                    required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
        </section>
      </>
    )
  }
  
  export default Login