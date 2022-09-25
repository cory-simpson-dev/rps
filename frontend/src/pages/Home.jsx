import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="heading">
        <h1>This is the landing page</h1>
        <p>Log in to make a post</p>
      </section>

      <Link to='/posts' className='btn btn-block'>
        View All Posts
      </Link>
    </>
  )
}

export default Home