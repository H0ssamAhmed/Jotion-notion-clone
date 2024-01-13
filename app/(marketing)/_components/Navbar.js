'use client';
import useScrollTop from '../../../hooks/use-scroll-top';
import React from 'react';
import Logo from './Logo';
import { Button } from "../../../components/ui/button";
import { ModeToggleSimple } from '../../../components/mode-toggle';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Spinner } from '../../../components/spinner';
import Link from 'next/link';
import useLoader from '../../../hooks/use-loader';

const Navbar = () => {
    const scroll = useScrollTop();
    const loaderHook = useLoader()
    const user = useUser()
    return (
        <div className={`w-full fixed flex items-center justify-between dark:bg-[#1f1f1f] bg-white p-4 
        top-0 z-50 ${scroll ? " border-b-2 shadow-lg" : ""}`}>
            <Link href='/'>
                <Logo />
            </Link>
            <div className='flex justify-between items-center  w-full sm:w-fit'  >

                <div className='flex justify-between items-center w-full sm:w-fit gap-4'>
                    <ModeToggleSimple />
                    {!user.isSignedIn && !loaderHook && (
                        <>
                            <SignInButton mode='modal'>
                                <Button variant='outline' size="sm">
                                    Login
                                </Button>
                            </SignInButton>
                            <SignUpButton mode='modal'>
                                <Button variant='default' size="sm">
                                    Get free access
                                </Button>
                            </SignUpButton>
                        </>
                    )}

                    {user.isSignedIn && !loaderHook && (
                        <>
                            <Button variant='default' size="sm">
                                <Link href='/documents' className=''>
                                    Enter Jotion
                                </Link>
                            </Button>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    )}
                    {loaderHook && <Spinner />}
                </div>
            </div>

        </div>
    );
};

export default Navbar;
