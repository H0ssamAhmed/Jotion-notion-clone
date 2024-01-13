import React from 'react'
import Heading from './_components/Heading'
import Heroes from './_components/Heroes'
import Footer from './_components/Footer'

const MargetingPage = () => {
    return (
        <div className='min-h-full h-full flex flex-col'>
            <div className='
            flex flex-col
            items-center
            justify-center
            md:justify-start
            text-center
            gap-y-8
            flex-1
            px-6 pb-10 pt-10'>
                <Heading />
                <Heroes />
                <Footer />
            </div>
        </div>
    )
}

export default MargetingPage