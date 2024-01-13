import React from 'react'
import Navbar from './_components/Navbar'
const marketingLayout = ({ children }) => {
    return (
        <div>
            <div className='h-full dark:bg-[#1f1f1f]'>
                <Navbar />
                <div className='pt-10'>{children}</div>
            </div>
        </div>
    )
}

export default marketingLayout
