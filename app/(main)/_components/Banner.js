import React from 'react'
import Image from 'next/image';

const Banner = ({ imageURL }) => {

    return (
        <>
            {imageURL &&

                <div className="h-[35vh] bg-secondary flex m-0 items-center justify-center relative">
                    <Image
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                        src={imageURL}
                        alt="Banner Image- May Provided URL not Correct, Please enter URL Correct"
                    />
                </div>
            }
        </>
    )

}

export default Banner