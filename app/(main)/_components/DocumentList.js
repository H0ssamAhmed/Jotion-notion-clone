"use client"
import { useMutation, useQuery } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { useParams, useRouter } from 'next/navigation'
import Item from './Item'
import { FileIcon, Plus } from 'lucide-react'
import { cn } from '../../../lib/utils'
import LoadingSkeleton from "./LoadingSkeleton"
import { toast } from 'sonner'
import { Button } from '../../../components/ui/button'

const DocumentList = ({ parentDeocumentId }) => {

  const params = useParams()
  const router = useRouter()
  const [hideFavorite, setHideFavorite] = useState(false)
  const [hidePrivate, setHidePrivate] = useState(false)


  const create = useMutation(api.documents.create);
  const documents = useQuery(api.documents.getSidebar, {
    parentDeocument: parentDeocumentId,
  })

  const handleCreate = (event) => {
    if (hidePrivate) setHidePrivate(false)
    event.stopPropagation()


    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))
    toast.promise(promise, {

      loading: "Creating new note",
      success: "New note created!",
      error: "There is Error",
    });
  };


  const favoriteDocument = documents?.filter((favs) => {
    return favs.IsFavourite
  })

  if (documents == undefined) {
    return <>
      <LoadingSkeleton />
      <br />
      <LoadingSkeleton />

    </>
  }
  return (
    <>
      {documents.length == 0 &&

        <p className="hidden text-sm font-medium text-muted-foreground/80">
          No pages inside
        </p>
      }
      <>
        {favoriteDocument?.length != 0 && (
          <>
            <div className='group px-2 text-muted-foreground mb-2'>
              <Button
                variant="ghost"
                size='xs'

                onClick={() => setHideFavorite(!hideFavorite)}
              >Favorite</Button>
            </div>

            <div className={cn("mb-6 transition-all block", hideFavorite && "hidden")}>
              {favoriteDocument.map((fav) => {
                return (
                  <div key={fav._id}>
                    <Item
                      reDirectId={fav._id}
                      id={fav._id}
                      label={fav.title}
                      Icon={FileIcon}
                      documentIcon={fav.icon}
                      active={params.documentId === fav._id}
                      IsFavourite={fav.IsFavourite}
                    />
                  </div>)
              })
              }
            </div>
          </>
        )}
        {documents?.length != 0 &&
          <div className='flex items-cesnter justify-between px-2 text-muted-foreground mb-2'>
            <Button
              variant="ghost"
              size='xs'
              onClick={() => setHidePrivate(!hidePrivate)}
            >Private</Button>

            <Plus role='button' className='w-4 h-4 group hover:bg-primary/5 mr-2'
              onClick={handleCreate}
            />
          </div>
        }
        <p className="hidden text-sm font-medium text-muted-foreground/80 last:block">
          No pages inside
        </p>
        {documents?.map((document) => (
          <div key={document._id}
            className={cn("block transition-all", hidePrivate && "hidden")}
          >
            <Item
              reDirectId={document._id}
              id={document._id}
              label={document.title}
              Icon={FileIcon}
              documentIcon={document.icon}
              active={params.documentId === document._id}
            />
          </div >
        ))}
      </>
    </>
  )
}
export default DocumentList
