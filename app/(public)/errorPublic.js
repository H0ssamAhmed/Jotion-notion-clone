"use client"
import React from 'react'
import Image from 'next/image'

const ErrorPublic = () => {
    return (
        <div className='flex items-center justify-center text-center h-screen w-screen'>
            <div className='flex flex-col gap-4'>
                <Image
                    width={500}
                    height={500}
                    src='/error.png'
                    className='object-contain dark:hidden'
                    alt="redirect"
                />
                <Image
                    width={500}
                    height={500}
                    src='/error-dark.png'
                    className='object-contain dark:block hidden'
                    alt="redirect"
                />
                <h2 className='text-xl font-medium my-4'>Somethis is wrong!</h2>
                <h3 className='text-xl font-medium my-4'>This page is not Public!</h3>
            </div >
        </div >
    )
}

export default ErrorPublic