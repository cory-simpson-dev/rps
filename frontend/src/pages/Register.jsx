import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
// useSelector allows us to select from global state (i.e. user, isSuccess value, message)
// useDispatch dispatches actions (i.e. register)
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    // instead of separate states for every field, use formData
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    // destructure formData
    const {name, email, password, password2} = formData

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

        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            // dispatch register() from authSlice.js with userData passed in as user
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    
    return (
      <>
        <section className="heading">
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>

        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    id='name' 
                    name='name'
                    value={name} 
                    onChange={onChange} 
                    placeholder='Enter your name'
                    required
                    />
                </div>
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
                    <input 
                    type="password" 
                    className="form-control" 
                    id='password2' 
                    name='password2'
                    value={password2} 
                    onChange={onChange} 
                    placeholder='Confirm password'
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
  
  export default Register