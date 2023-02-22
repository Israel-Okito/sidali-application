import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import '../style/addPostPage.css'
import { addPost, reset } from '../features/posts/postSlice'

const AddPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
      })
    
      const { title, description, imageUrl } = formData
    
      const dispatch = useDispatch()
      const navigate = useNavigate()
    
      const {isLoading, isError, isSuccess, message} = useSelector(state => state.post)

      const { user} = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if(isError){
          console.log(message)
        }
        if(isSuccess){
          navigate('/')
          dispatch(reset())
        }
      }, [dispatch,isError, isSuccess, navigate, message])
    
      const onChange = (event) => {
        setFormData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }))
      }
    
      const onSubmit = (event) => {
        event.preventDefault()
        const postData = {title, description, imageUrl, userId: user.id}
        dispatch(addPost(postData))
      }
  return (

    <section className='addpost-section'>
      <div className='addpost-main_container'>
        <div className='addpost-top_container'>
          <h1>Add a new Post</h1>
        </div>
        <div className='addpost-bottom_container'>
          <form action='' className='form-container' onSubmit={onSubmit}>
            <input
              type='text'
              className='form-input'
              name='title'
              placeholder='Title'
              onChange={onChange}
            />
            <textarea
              type='text'
              className='form-input'
              name='description'
              placeholder='Description'
              onChange={onChange}
            />           

            {/* <input
              type='text'
              className='form-input'
              name='imageUrl'
              placeholder='ImageUrl'
              onChange={onChange}
            />   */}
            <input 
            className='form-input' 
            type="file"
            name='imageUrl'
            onChange={onChange} 
             accept='Image/* ' />   
            <button className='btn-form'>Add Post</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddPost