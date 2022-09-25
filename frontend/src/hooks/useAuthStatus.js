// protecting routes by ensuring user is logged in
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    // get user through redux/backend
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    }, [user])

    return {loggedIn, checkingStatus}
}