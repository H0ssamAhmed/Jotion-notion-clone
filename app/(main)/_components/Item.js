"use client"
import { useRouter } from "next/navigation";
import { cn } from "../../../lib/utils"
import { MoreHorizontal, Star, StarOff, Trash2Icon } from "lucide-react"
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuItem } from "../../../components/ui/dropdown-menu";

function Item({
  id,
  label,
  onCreate,
  Icon,
  active,
  documentIcon,
  IsFavourite,
  reDirectId
}) {
  const { user } = useUser()
  const router = useRouter();



  const archived = useMutation(api.documents.archived)

  const handelDeltet = (event) => {
    event.stopPropagation()
    const promise = archived({ id })

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note."
    });
  }

  const makeItFavorite = useMutation(api.documents.favorite)

  const addToFavorite = (id) => {

    const promise = makeItFavorite({ id })
    toast.promise(promise, {
      loading: "Adding to favorite...",
      success: "Note Wase added to favorite!",
      error: "Failed to add note to favorite."
    })
  }


  const makeItUnFavorite = useMutation(api.documents.unfavorite)

  const removeToFavorite = (id) => {

    const promise = makeItUnFavorite({ id })
    toast.promise(promise, {
      loading: "Adding to favorite...",
      success: "Note Wase added to favorite!",
      error: "Failed to add note to favorite."
    })
  }


  const onRedirect = (documentId) => router.push(`/documents/${documentId}`)


  return (
    <div
      onClick={onCreate}
      role='button'

      className={cn("group min-h-[27px] text-sm py-1 my-1 pr-3  w-full flex items-center text-muted-foreground font-medium hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
    >
      <div className="flex w-[90%]" >
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">
            <span>{documentIcon}</span>
          </div>
        ) : (
          <Icon
            className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground "
          />
        )}

        <span
          onClick={() => !!id ? onRedirect(reDirectId) : ""}
          className="truncate w-full">
          {label}
        </span>

      </div>

      {!!id && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>

              <div
                role="button"
                className="flex items-center gap-x-2"
                onClick={handelDeltet}
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground/50 hover:text-white" />

              </div>
            </DropdownMenuTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuContent
              className="w-72 bg-gray-200 dark:bg-[#191919] drop-shadow-lg dark:border-gray-700 border-gray-300 border-2 rounded-sm my-2 mx-4 z-[9999] transition-all absolute"
              align="start"
            >
              <div className='flex items-start p-2 justify-start flex-col transition-all select-none text-start text-sm'>


                {IsFavourite
                  ?
                  <DropdownMenuItem className="w-full" onClick={() => removeToFavorite(id)}>
                    <div
                      role='button'
                      className='opacity-50 w-full h-full transition-all hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-orange-500'>
                      <StarOff className='w-4 h-4' />
                      remove to favorite
                    </div>
                  </DropdownMenuItem>
                  :
                  <DropdownMenuItem className="w-full" onClick={() => addToFavorite(id)}>
                    <div
                      role='button'
                      className='opacity-50  transition-all w-full h-full hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-orange-500'>
                      <Star className='w-4 h-4' />
                      add to favorite
                    </div>
                  </DropdownMenuItem>

                }
                <DropdownMenuItem className="w-full" onClick={handelDeltet}>
                  <div
                    role='button'
                    className='opacity-50 transition-all w-full h-full hover:opacity-100 flex items-center gap-2 justify-start m-2 hover:text-red-700'>
                    <Trash2Icon className='w-4 h-4' />
                    Delete
                  </div>
                </DropdownMenuItem>

                <h1 className="m-2">Last Edit By:<b> {user.fullName}</b></h1>
                <DropdownMenuSeparator />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

    </div >

  )
}

export default Item