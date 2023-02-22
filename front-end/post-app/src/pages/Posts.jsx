import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../features/posts/postSlice'
import '../style/postsPage.css'

const Posts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { posts, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  )
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  return (
    <section className='posts-section'>
      <div className='posts-container'>
        {isLoading ? (
          <div className='load'>
            <p classNmae="line"></p>
            <p classNmae="line"></p>
            <p classNmae="line"></p>
          </div>
        ) : isError ? (
          <p>{message}</p>
        ) : (
          isSuccess && (
            <div className='post-content'>
              {posts.posts.map((post) => (
                <>
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                  <p className='imagea'>{post.imageUrl}</p>
                 <div className='postbouton'>
                   <button onClick={() => navigate(`/post/${post._id}`)}>View Post</button>
                    
                    <button onClick={() => navigate(`/post/update/${post._id}`)}>Update Post</button>
                    
                    <button onClick={()=> navigate(`/post/delete/${post._id}`)}>Delete Post</button>  
                 </div>
                  
                </>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Posts
