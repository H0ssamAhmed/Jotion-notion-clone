import React, { use } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu'
import { Trash2, Trash, Undo } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'

const TrashBox = () => {
  const { user } = useUser()
  const router = useRouter()


  const archivedDocuments = useQuery(api.documents.getTrash, {
    userId: user?.id
  })
  console.log(archivedDocuments);
  const Unarchived = useMutation(api.documents.Unarchived)

  const restoeFormTrash = (id) => {
    const promise = Unarchived({ id })
      .then(() => router.push(`/documents/${id}`))

    toast.promise(promise, {
      loading: "Restoring from trash...",
      success: "Note Restored!",
      error: "Failed to restore note."
    });
  }

  const deleteDocument = useMutation(api.documents.deleteDocument)

  const deleteForEvery = (id) => {
    const promise = deleteDocument({ id }).then(router.push('/documents'))

    toast.promise(promise, {
      loading: "Deleting forever...",
      success: "Deleted successfully!",
      error: "Failed to restore delete."
    });

  }

  return (
    <div
      className='h-4 transition-all pb-4 w-full flex items-center gap-2 justify-start mb-4 pt-4'
    >
      <DropdownMenu className='mt-auto pb-4 w-full' >
        <DropdownMenuTrigger>
          <div
            role='button'
            className='opacity-70 h-6 w-full transition-all hover:opacity-100 flex items-center gap-2 justify-start'
          >
            <Trash className='w-4 h-4' />
            <span>Trash</span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="fixed left-4 bottom-8 w-64 bg-gray-200 dark:bg-[#191919] p-0  max-h-[80vh] overflow-auto drop-shadow-lg dark:border-gray-700 border-gray-300 border-2 rounded-sm my-2 mx-4 z-[9999] transition-all"
          align="start"
        >

          <p className="hidden text-sm font-medium text-muted-foreground/80 last:block p-3">
            No pages inside
          </p>
          {archivedDocuments?.map((document) => (

            <div
              key={document._id}
              className='flex items-center group justify-start gap-x-4 m-2'
            >
              <DropdownMenuItem
                className='w-1/2 cursor-pointer text-muted-foreground font-medium dark:hover:text-white hover:text-black'
                role='button'
                onClick={() => router.push(`/documents/${document._id}`)}
              >
                {document.title}
              </DropdownMenuItem>

              <div className='flex items-center justify-center gap-x-4 m-auto'>
                <DropdownMenuItem title="Restoe this page">
                  <Undo className='w-4 h-4 hover:text-orange-500 block' role='button'
                    onClick={() => restoeFormTrash(document._id)}
                  />

                </DropdownMenuItem>


                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div title="Delete this page permanently" >
                      <Trash2 className='w-4 h-4 hover:text-red-800 block' role='button' />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className='w-96 h-36 p-4'>
                      <div className='overlay bg-background/80 transition-all absolute'></div>
                      <h1>Are You sure to delete this page forever?</h1>
                      <p className='text-muted-foreground'>This action cannot be undone.</p>
                      <div className='flex justify-evenly items-center font-medium mt-4'>
                        <DropdownMenuItem
                          className="cursor-pointer"
                        >
                          Cancel
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteForEvery(document._id)}
                          className="cursor-pointer bg-black text-white dark:bg-white dark:text-black"
                        >
                          Delete
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>

                </DropdownMenu>
                <DropdownMenuSeparator className="h-2" />


              </div>
            </div>
          ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div >
  )
}

export default TrashBox