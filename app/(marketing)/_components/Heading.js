"use client"
import { Button } from '../../../components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Spinner } from '../../../components/spinner'

import useLoader from '../../../hooks/use-loader'
import { SignUpButton, useUser } from '@clerk/clerk-react'
const Heading = () => {
    const User = useUser()
    const loaderHook = useLoader()

    return (
        <div className='max-w-3xl space-y-4'>
            <h1 className='text-3xl sm:text-5xl md:text-6xl '>
                Your Ideas, Documents, & <br /> Plans. Unified. Welcome to
                <span className="font-medium underline" > Jotion</span>

            </h1>
            <h3 className='text-base sm:text-xl md:text-2xl pb-4 font-medium'>Jotion is connected workspace where better, fasted wrok happens</h3>

            {loaderHook &&
                <div className='flex items-center justify-center'>
                    <Spinner size='xlg' />
                </div>
            }
            {User.isSignedIn && !loaderHook &&
                <Link href='/documents'>
                    <Button variant='default' size="sm" className="rounded-full hover:px-6 flex justify-center items-center m-auto w-fit transition-all transition-1000">
                        Enter Jotion
                        <ArrowRight />
                    </Button>
                </Link >
            }

            {!User.isSignedIn && !loaderHook &&
                <SignUpButton mode='modal'>
                    <Button variant='default' size="sm" className="rounded-full hover:px-6 flex justify-center items-center m-auto w-fit transition-all transition-1000">
                        Get Jotion
                        <ArrowRight />
                    </Button>
                </SignUpButton>
            }
        </div >
    )
}

export default Heading
