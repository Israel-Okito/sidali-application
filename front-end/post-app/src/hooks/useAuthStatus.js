import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkLoggedIn, setCheckLoggedIn]= useState(true)

    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        if(user){
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCheckLoggedIn(false)
    }, [user])
  return {loggedIn, checkLoggedIn}
}
