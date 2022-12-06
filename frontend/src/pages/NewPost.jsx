import {useState, useEffect} from 'react'
// get user from global state using useSelector
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {toast} from 'react-toastify'
import {createPost, resetPost} from '../features/posts/postSlice'
import Spinner from '../components/Spinner'

function NewPost() {
    // get user from global state (auth)
    const {user} = useSelector((state) => state.auth)
    // useSelector from post state (not auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.posts)

    // local state
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [media, setMedia] = useState('')
    // check if media is going to be included
    const [includeMedia, setIncludeMedia] = useState(false)
    // select image or video
    const [mediaType, setMediaType] = useState('image')
    const [videoUrl, setVideoUrl] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess) {
            dispatch(resetPost())
            navigate(`/user/${user.username}`)
        }

        dispatch(resetPost())
        // dependencies go at end of useEffect() as array
    }, [dispatch, isError, isSuccess, navigate, message, user])

    const handleMediaTypeChange = () => {
        mediaType === 'image' ? setMediaType('video') : setMediaType('image')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (includeMedia) {
            if (mediaType === 'video') {
                dispatch(createPost({title, body, url: videoUrl, mediaType}))
            } else {
                const data = new FormData()
                data.append('file', media)
                data.append('upload_preset', 'homal-site-testing')
                data.append('cloud_name', 'cory-simpson-dev')
                fetch(`https://api.cloudinary.com/v1_1/cory-simpson-dev/image/upload`, {
                    method: 'post',
                    body: data,
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    let url = data.secure_url
                    // uses postSlice & postService
                    dispatch(createPost({title, body, url, mediaType: 'image'}))
                })
                .catch(err => {
                    console.log(err);
                })
            }
        } else {
            dispatch(createPost({title, body}))
        }
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <div className="mx-auto w-full py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="max-w-3xl mx-auto">
            <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                <div className="space-y-6 divide-y divide-gray-200 sm:space-y-5">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-center text-3xl tracking-tight text-primary-content sm:text-4xl">Create New Post</h1>
                        <div role="group" aria-labelledby="label-email">
                            <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                                <div>
                                    <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                                        Include media
                                    </div>
                                </div>
                                <div className="mt-4 sm:col-span-2 sm:mt-0">
                                    <div className="max-w-lg space-y-4">
                                        <div className="relative flex items-start">
                                            <div className="flex h-5 items-center">
                                                <input
                                                  id="comments"
                                                  name="comments"
                                                  type="checkbox"
                                                  onChange={() => setIncludeMedia(!includeMedia)}
                                                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="comments" className="font-medium text-gray-700">
                                                    Media
                                                </label>
                                                <p className="text-gray-500">When selected, you may choose to include a photo file or video URL.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    { includeMedia && 

                        <div className="flex flex-col gap-4">
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                            <div>
                                <div
                                  className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                  id="label-notifications"
                                >
                                  Media type
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="max-w-lg">
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="push-everything"
                                                name="push-notifications"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={handleMediaTypeChange}
                                                defaultChecked={true}
                                            />
                                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                Image
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="push-email"
                                                name="push-notifications"
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                onChange={handleMediaTypeChange}
                                            />
                                            <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                Video URL
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { includeMedia && mediaType === 'image' &&
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                            <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">
                                <label htmlFor="image" className="form-label inline-block mb-2 text-gray-700">Image</label>
                            </div>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg shadow-sm">
                                    <input 
                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                        type="file" 
                                        id="image"
                                        name="media"
                                        onChange={(e) => setMedia(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        }

                        { includeMedia && mediaType === 'video' &&
                        <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4">
                            <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-notifications">
                                <label htmlFor="video" className="form-label inline-block mb-2 text-gray-700">Video</label>
                            </div>
                            <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <div className="flex max-w-lg shadow-sm">
                                    <input 
                                    name="media" 
                                    type="text" 
                                    className="block w-full min-w-0 flex-1 rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                                    id="video" 
                                    onChange={(e) => setVideoUrl(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        }


                </div>
                        }
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Title
                      </label>
                      <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <div className="flex max-w-lg shadow-sm">
                            <input 
                            name="title" 
                            type="text" 
                            className="block w-full min-w-0 flex-1 rounded-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                            id="title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Text body
                        </label>
                        <div className="mt-1 sm:col-span-2 sm:mt-0">
                        <CKEditor
                            editor={ ClassicEditor }
                            data={body}
                            config={ {
                                toolbar: {
                                    items: [ 'bold', 'italic', '|', 'link', '|', 'undo', 'redo',]
                                }
                            } }
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setBody(data)
                            } }
                        />
                        <p className="mt-2 text-sm text-gray-500">Peace, love, unity and respect!</p>
                        </div>
                    </div>
                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-centerborder border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Post
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default NewPost