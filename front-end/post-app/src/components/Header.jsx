import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }
  return (
    <header className='header'>
      <h3>
        {' '}
        <Link to='/' className='menu-home'>
          Home
        </Link>{' '}
      </h3>
      <nav>
        <ul className='menu-container'>
          {user ? (
            <>
              <li>
                <Link to='/posts'>Posts</Link>{' '}
              </li>
              <li>
                <Link to='/add-post'>Add Post</Link>{' '}
              </li>
              <li>
                <Link to='/profile'>Profile</Link>{' '}
              </li>
              <li className='menu-logout' onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>{' '}
              </li>
              <li>
                <Link to='/register'>Register</Link>{' '}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
