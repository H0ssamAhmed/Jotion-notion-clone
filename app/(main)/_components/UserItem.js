"use client"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { SignOutButton, useUser } from '@clerk/clerk-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const UserItem = () => {
    const { user } = useUser()

    const navigation = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <div className='w-full select-none'>
                    <div className='flex items-center p-2 text-sm w-full gap-x-2 hover:bg-primary/5 text-primary/50 hover:text-primary transition-all'
                        role='button'>
                        <Avatar className='w-6 h-6'>
                            <AvatarImage src={user.imageUrl} className='rounded-sm' />
                        </Avatar>
                        <span className=' text-xs'>{user.firstName}&apos;s Jotion</span>
                        <ChevronsLeftRight className='rotate-90' />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-72 bg-gray-200 dark:bg-[#191919] drop-shadow-lg dark:border-gray-700 border-gray-300 border-2 rounded-sm my-2 mx-4 z-[9999] transition-all absolute"
                align="start"
            >
                <div className='flex items-start p-2 justify-start flex-col transition-all select-none text-start text-sm'>
                    <span className=' text-primary/50 px-4 block'>{user.emailAddresses[0].emailAddress}</span>
                    <div className='flex items-center justify-start p-2 text-sm w-full gap-x-2 mb-6 hover:bg-primary/5'
                        role='button'>
                        <DropdownMenuSeparator className=' bg-black h-4' />
                        <Avatar className='w-6 h-6'>
                            <AvatarImage src={user.imageUrl} className='rounded-full' />
                        </Avatar>
                        <span>{user.fullName}&apos;s Jotion</span>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='hover:bg-red-800 bg-red-700 text-white p-2 rounded-md'>
                        <SignOutButton
                            signOutCallback={() => navigation.replace("/")}
                        >
                            Log Out
                        </SignOutButton>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu >

    )
}

export default UserItem