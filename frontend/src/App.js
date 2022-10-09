import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewPost from './pages/NewPost'
import Posts from './pages/Posts'
import Post from './pages/Post'
import UserPage from './pages/UserPage'
import MessageBoard from './pages/MessageBoard'

function App() {
  return (
    <>
      <Router>
        <div className="container h-full mx-auto">
          <div className="bg-white h-full">
            <div className="mx-auto h-full max-w-7xl">
              <div className="z-9 bg-white h-full lg:w-full grid grid-rows-[92px_1fr]">
              <Header />
                <main className="mx-auto py-8 max-w-7xl px-4 sm:px-6 lg:px-8 w-full overflow-auto">
                  {/* can only ever have route components */}
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/post/:postId' element={<Post />} />
                    {/* need nested route for private routes (routes that require login) */}
                    <Route path='/new-post' element={<PrivateRoute />}>
                      <Route path='/new-post' element={<NewPost />} />
                    </Route>
                    <Route path='/messaging' element={<PrivateRoute />}>
                      <Route path='/messaging' element={<MessageBoard />} />
                    </Route>
                    <Route path='/user/:username' element={<UserPage />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;