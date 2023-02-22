import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AddPost from './pages/AddPost'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Posts from './pages/Posts'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import UpdatePost from './pages/UpdatePost'
import DeletePost from './pages/DeletePost'


function App() {
  return (
    <>
      <Router>
        <div className='main-app_container'>
          <Header />
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>

            <Route path='/add-post' element={<PrivateRoute />}>
              <Route path='/add-post' element={<AddPost />} />
            </Route>

            <Route path='/posts' element={<PrivateRoute />}>
              <Route path='/posts' element={<Posts />} />
            </Route>
            <Route path='/post/:postId' element={<PrivateRoute />}>
              <Route path='/post/:postId' element={<SinglePost />} />
            </Route>

            <Route path='/post/update/:postId' element={<PrivateRoute />}>
              <Route path='/post/update/:postId' element={<UpdatePost />} />
            </Route>

            <Route path='/post/delete/:postId' element={<PrivateRoute />}>
              <Route path='/post/delete/:postId' element={<DeletePost />} />
            </Route>

          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
