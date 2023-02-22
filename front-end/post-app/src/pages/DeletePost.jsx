import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import '../style/deletePostPage.css'
import { getPost, deletePost, reset} from '../features/posts/postSlice'

const DeletePost = () => {
  const { postId } = useParams()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  })

  const { title, description, imageUrl } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { post, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(isSuccess){
      navigate('/')
      dispatch(reset())
      
    dispatch(getPost(postId))
    }
  }, [dispatch, isError, isSuccess, navigate, message, postId])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const postData = {
      title: title || post.post.title,
      description: description || post.post.description,
      imageUrl: imageUrl || post.post.imageUrl,
      postId: postId,
    }

    dispatch(deletePost(postData))
  }
  return (
    <section className='deletepost-section'>
      {isLoading ? (
        <p>loading ...</p>
      ) : (
        <div className='deletepost-main_container'>
          <div className='deletepost-top_container'>
            <h1>Delete Post</h1>
          </div>
          <div className='deletepost-bottom_container'>
            <form action='' className='form-container' onSubmit={onSubmit}>
              <input
                type='text'
                className='form-input'
                name='title'
                placeholder={post.post.title}
                onChange={onChange}
              />
              <input
                type='text'
                className='form-input'
                name='description'
                placeholder={post.post.description}
                onChange={onChange}
              />
              <input
                type='text'
                className='form-input'
                name='imageUrl'
                placeholder={post.post.imageUrl}
                onChange={onChange}
              />
              <button className='btn-form'>Delete Post</button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default DeletePost
