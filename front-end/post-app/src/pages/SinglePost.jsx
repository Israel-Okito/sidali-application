import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../features/posts/postSlice'

const SinglePost = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const { post, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )

  useEffect(() => {
      dispatch(getPost(postId))
  }, [dispatch, postId])

  if(isLoading){
      return <p>loading ...</p>
  }

  if(isSuccess && post){

    return (
        <section className='singlepost-section'>
          <div className='singlepost-content'><p>{post.post.title}</p></div>
      </section>
    )
      
  }
}

export default SinglePost
