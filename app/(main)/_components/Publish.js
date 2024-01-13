import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'
import { Copy, CopyCheck, Globe, Globe2 } from 'lucide-react'
import { useOrigin } from '../../../hooks/use-origin'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

const Publish = ({ Data }) => {
    const origin = useOrigin()
    const [copied, setCopied] = useState(false)
    const update = useMutation(api.documents.update)

    const getById = useQuery(api.documents.getById, {
        documentId: Data?._id,
    })

    const url = `${origin}/preveiw/${Data?._id}`

    const onPuplish = () => {
        const promise = update({
            id: Data?._id,
            isPublished: true
        })
        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published",
            error: "Failed to publish note.",
        })
    }
    const onUnPuplish = () => {
        const promise = update({
            id: Data?._id,
            isPublished: false
        })
        toast.promise(promise, {
            loading: "unPublishing...",
            success: "Note unpublished",
            error: "Failed to unpublish note.",
        })
    }
    const onCopy = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)

        setTimeout(() => setCopied(false), 1000);
    }
    const CopyMark = copied ? CopyCheck : Copy
    return (
        <div >

            <Popover className='p-0'>
                <PopoverTrigger>
                    <Button
                        className='flex items-center justify-center gap-1'
                        variant='ghost' size="sm"
                    >
                        Publish
                        <Globe className='w-4 h-4 text-sky-400' />
                    </Button>

                </PopoverTrigger>
                <PopoverContent className='w-[320px] h-[200px]'>
                    <div className='flex flex-col items-center gap-y-3'>
                        {getById?.isPublished
                            ?
                            <>
                                <p className=' text-sky-500 flex items-center justify-start gap-2 '>
                                    <Globe className='h-4 w-4' />
                                    This note is live on web.
                                </p>
                                <div className='w-full flex items-center justify-center h-6 py-4 my-4'>
                                    <input
                                        className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                        value={url}
                                        disabled
                                    />
                                    <Button
                                        onClick={onCopy}
                                        disabled={copied}
                                        className="h-8 rounded-l-none"
                                    >
                                        <CopyMark className='h-4 w-4' />
                                    </Button>

                                </div>
                                <Button
                                    onClick={onUnPuplish}
                                    size="sm"
                                    className="w-full mt-2"
                                >
                                    UnPublish
                                    <Globe className='h-4 w-4 ml-2 text-sky-500' />
                                </Button>
                            </>

                            :
                            <>
                                <Globe className='h-8 w-8 text-gray-400' />
                                <h2 className=' font-semibold text-primary'>Publish this note</h2>
                                <p className='text-[#777] text-sm'>Share your work with others.</p>
                                <Button
                                    size="sm"
                                    onClick={onPuplish}
                                    className="w-full mb-0"
                                >
                                    Publish
                                    <Globe className='h-4 w-4 ml-2 text-sky-500' />
                                </Button>
                            </>
                        }

                    </div >
                </PopoverContent>

            </Popover>

        </div >
    )

}


export default Publish