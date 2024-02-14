"use client"
import { cn } from '../../../lib/utils'
import { useMediaQuery } from '@uidotdev/usehooks'
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircleIcon,
  SearchIcon,
  Settings,

} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import UserItem from './UserItem'
import Item from './Item'
import { api } from '../../../convex/_generated/api'
import { useMutation } from "convex/react";
import { toast } from 'sonner'
import DocumentList from './DocumentList'
import { usePathname, useRouter } from 'next/navigation'
import TrashBox from '../_components/TrashBox'
import { useUser } from '@clerk/clerk-react'
const Navigation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname()
  const { user } = useUser()

  const router = useRouter()


  const isResizingRef = useRef(false);
  const asideRef = useRef(null);
  const navbarRef = useRef(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => isMobile ? hiddeNavbar() : resetWidth(), [isMobile, pathname])

  const create = useMutation(api.documents.create);

  const handleCreate = (event) => {
    event.stopPropagation()
    const promise = create({ title: "untitle", userId: user.id })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating new note",
      success: "New note created!",
      error: "There is Error",
    });
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation()
    if (isMobile) return;
    isResizingRef.current = true
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (event) => {
    if (!isResizingRef.current) return;
    let newSideWidth = event.clientX

    if (newSideWidth < 140) newSideWidth = 140
    if (newSideWidth > 480) newSideWidth = 480

    if (asideRef.current && navbarRef.current) {
      asideRef.current.style.width = `${newSideWidth}px`
    }
  }
  const handleMouseUp = () => {
    isResizingRef.current = false
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  const resetWidth = () => {
    if (asideRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      asideRef.current.style.setProperty("width", isMobile ? "100vw" : "240px")
      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const hiddeNavbar = () => {
    if (asideRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)
      asideRef.current.style.setProperty("width", "0px")

      setIsCollapsed(true)
      setTimeout(() => setIsResetting(false), 300);
    }
  }



  return (

    <div className='relative asideRef'>
      <aside ref={asideRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 ps-5 pt-5 flex-col z-[99] bg-gray-200  dark:bg-[#202020]',
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0",
          isCollapsed && "p-0"
        )}>
        <div
          role='button'
          onClick={hiddeNavbar}
          title="Reset NanBar size"
          className={cn("h-6 w-6 flex justify-center items-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-3 opacity-70 group-hover/sidebar:opacity-100 transition", isMobile && "opacity-100"
          )}>
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div className="my-4  bg-secondary   px-4 py-1 -ml-[20px]">
          <UserItem />

          <Item
            label="Search"
            Icon={SearchIcon} />
          <Item
            label="Settings & Members"
            Icon={Settings} />
          <Item
            onCreate={handleCreate}
            label="New Page"
            Icon={PlusCircleIcon} />
        </div>
        <div className='mt-2 mb-2 overflow-auto'>
          <DocumentList />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn('bg-gray-400 opacity-50 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0',
          )}
        />
        <hr className=' h-[2px] -ml-5 bg-secondary' />
        <TrashBox />
      </aside>
      <nav ref={navbarRef} className='toggler absolute top-2 -right-9  z-[998]  flex justify-center items-center'>
        {isCollapsed &&
          < MenuIcon
            role='button'
            onClick={resetWidth}
            className="text-muted-foreground h-6 w-6 rounded-md"
          />
        }
      </nav>
    </div >
  )

}

export default Navigation