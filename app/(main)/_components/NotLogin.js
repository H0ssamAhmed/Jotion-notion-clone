import Navbar from '../../(marketing)/_components/Navbar'
import { Button } from '../../../components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotLogin = () => {
    return (
        <div className="flex items-center justify-center h-[100vh]">
            <div className="flex flex-col items-center justify-center gap-y-20">
                <Navbar />
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[30px] flex items-center justify-center ">
                        You need to Login First
                    </h1>
                    <SignInButton mode='modal'>
                        <Button variant='' size="sm">
                            Login
                        </Button>
                    </SignInButton>
                </div>

                <Image
                    width={500}
                    height={500}
                    src='/redirect.svg'
                    className='object-contain '
                    alt="redirect"
                />
                <div className="flex flex- gap-3 items-stretch">
                    <Link href='/'>
                        <Button variant='default' size="sm">
                            Home Page
                        </Button>
                    </Link>

                </div>
            </div>
        </div >
    )
}

export default NotLogin