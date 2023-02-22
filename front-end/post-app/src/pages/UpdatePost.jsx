import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import '../style/updatePostPage.css'
import { getPost, updatePost } from '../features/posts/postSlice'

const UpdatePost = () => {
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
    dispatch(getPost(postId))
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

    dispatch(updatePost(postData))
  }
  return (
    <section className='updatepost-section'>
      {isLoading ? (
        <p>loading ...</p>
      ) : (
        <div className='updatepost-main_container'>
          <div className='updatepost-top_container'>
            <h1>Update Post</h1>
          </div>
          <div className='updatepost-bottom_container'>
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
              <button className='btn-form'>Update Post</button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default UpdatePost
