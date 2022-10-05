import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {toast} from 'react-toastify'
// useSelector allows us to select from global state (i.e. user, isSuccess value, message)
// useDispatch dispatches actions (i.e. register)
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
// styles
import { LockClosedIcon } from '@heroicons/react/20/solid'
import {
  TbHeartHandshake
} from 'react-icons/tb'

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
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <TbHeartHandshake className='mx-auto h-12 w-auto text-indigo-600 hover:text-indigo-700'/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to='/register'>
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  sign up today
                </span>
              </Link>
            </p>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                    onChange={onChange}
                    value={email} 
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                    onChange={onChange}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                />
              </div>
            </div>

            {/* Additional features */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
    )
  }
  
  export default Login