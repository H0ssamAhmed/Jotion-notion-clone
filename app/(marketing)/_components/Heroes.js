"use client"
import Image from 'next/image'
import React from 'react'

const Heroes = () => {
    return (
        <div className='flex flex-col items-center justify-'>
            <div className='flex items-center'>
                <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]'>
                    <Image
                        src="/documents.png"
                        fill
                        className='object-contain dark:hidden'
                        alt="document"
                        size={45}
                    />
                    <Image
                        src="/documents-dark.png"
                        fill
                        className='object-contain hidden dark:block'
                        alt="document"
                        size={45}
                    />
                </div>
                <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] hidden md:block'>
                    <Image
                        src="/Reading.png"
                        fill
                        className='object-contain dark:hidden'
                        alt="Reading"
                        size={45}
                    />
                    <Image
                        src="/Reading-dark.png"
                        fill
                        className='object-contain  hidden dark:block'
                        alt="Reading"
                        size={45}
                    />
                </div>
            </div>
        </div>
    )
}

export default Heroes