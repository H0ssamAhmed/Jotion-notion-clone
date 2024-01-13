
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
const useLoader = () => {
    const User = useUser()

    const [loaded, setLoaded] = useState(true)
    useEffect(() => User.isLoaded ? setLoaded(false) : setLoaded(true), [])
    return loaded
}

export default useLoader