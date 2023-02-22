import axios from 'axios'

//add Post
const addPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    'http://localhost:5000/api/post/add-post',
    post,
    config
  )
  return response.data
}

//update Post
const updatePost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    `http://localhost:5000/api/post/update-post/${post.postId}`,
    post,
    config
  )
  return response.data
}
//delete
const deletePost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(
    `http://localhost:5000/api/post/delete-post/:postId${post.postId}`,
    post,
    config
  )
  return response.data
}


//getPosts
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(
    'http://localhost:5000/api/post/posts',config
  )
  return response.data
}

//getPost
const getPost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(
    `http://localhost:5000/api/post/posts/${postId}`,config
  )
  return response.data
}
const postService = {addPost, updatePost, deletePost,getPosts, getPost}

export default postService
