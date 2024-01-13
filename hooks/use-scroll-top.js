import React from 'react'
import { useState, useEffect } from 'react'

const useScrollTop = (scrolledValue = 10) => {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true)
            } else
                setScrolled(false)
        }
        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }
    }, [scrolledValue])

    return scrolled

}

export default useScrollTop