import React from 'react'
import { Button } from "../../..//components/ui/button";
import { api } from '../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../components/ui/dropdown-menu'


export const Delete = () => {
    const params = useParams()
    const router = useRouter()

    const Unarchived = useMutation(api.documents.Unarchived)

    const restoeFormTrash = (id) => {
        const promise = Unarchived({ id })

        toast.promise(promise, {
            loading: "Restoring from trash...",
            success: "Note Restored!",
            error: "Failed to restore note."
        });
    }

    const deleteDocument = useMutation(api.documents.deleteDocument)

    const deleteForEvery = (id) => {
        const promise = deleteDocument({ id })
            .then(() => router.push('/documents'))

        toast.promise(promise, {
            loading: "Deleting forever...",
            success: "Deleted successfully!",
            error: "Failed to restore delete."
        });
    }

    return (
        <div className=" w-full flex justify-center items-center gap-2  sm:flex-row flex-col text-black dark:text-white bg-red-500 h-fit py-2">
            <h1 className='text-white'>This page is Deleted</h1>
            <div className='flex gap-2 flex-col sm:flex-row'>


                <Button
                    onClick={() => restoeFormTrash(params.documentId)}
                    size="xs"
                    variant="default">Restore?</Button>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                size="xs"
                                variant="outline">Delete Forever?</Button>
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
                                        onClick={() => deleteForEvery(params.documentId)}

                                        className="cursor-pointer bg-black text-white dark:bg-white dark:text-black"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </div>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </div>
    )

}
export default Delete
