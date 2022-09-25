import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="heading">
        <h1>What are you making?</h1>
        <p>Please be creative</p>
      </section>

      <Link to='/new-post' className='btn btn-reverse btn-block'>
        Create New Post
      </Link>
      <Link to='/posts' className='btn btn-block'>
        View All Posts
      </Link>
    </>
  )
}

export default Home