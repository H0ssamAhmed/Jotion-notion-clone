'use client';

import { useEdgeStore } from '../../../lib/edgestore';
import { SingleImageDropzone } from '../../../components/single-image-dropzone'
import { ImageMinus, ImagePlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../../../components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function SingleImageDropzoneUsage({ imageURL, imagePreview }) {
    const params = useParams()
    const updateDocument = useMutation(api.documents.update)


    const [file, setFile] = useState();
    const { edgestore } = useEdgeStore();
    const [isSubmitted, setIsSubmitted] = useState(false)
    const onClose = () => {
        setFile('')
        setIsSubmitted(false)
    }
    const uploadImage = async (file) => {
        if (file) {
            setIsSubmitted(true);
            setFile(file);

            try {
                const res = await edgestore.publicFiles.upload({
                    file
                });
                await updateDocument({
                    id: params.documentId,
                    coverImage: res.url
                });
                toast.message('Image Uploaded Successfully!');
                setTimeout(() => {
                    onClose();
                }, 0);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };



    const removeImage = () => {
        if (imageURL) {
            edgestore.publicFiles.delete({
                url: imageURL,
            });
        }
        // update url from schema to be '' 
        updateDocument({
            id: params.documentId,
            coverImage: ''
        })
        toast.message('Image has been removed Successfully!')
        setTimeout(() => {
            onClose()
        }, 0);
    }

    return (
        <>
            <DropdownMenu className='mt-0'>
                {imageURL && !imagePreview
                    &&
                    <>
                        <Button
                            onClick={removeImage}
                            className="text-muted-foreground group-hover:opacity-100 opacity-50 text-xs ml-2"
                            variant="secondary"
                            size="sm">
                            <ImageMinus className="h-4 w-4 mr-2" />
                            Remove Image
                        </Button>
                        <DropdownMenuTrigger
                            className="text-muted-foreground group-hover:opacity-100 opacity-50 bg-secondary text-xs h-9 rounded-sm px-3 ml-2 flex items-center">
                            <ImagePlus className="h-4 w-4 mr-2" />Change Image
                        </DropdownMenuTrigger>
                    </>
                }
                {!imagePreview && !imageURL ?
                    <>
                        <DropdownMenuTrigger>
                            <Button
                                className="text-muted-foreground group-hover:opacity-100 opacity-50 text-xs flex"
                                variant="secondary"
                                size="sm">
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Add Image
                            </Button>
                        </DropdownMenuTrigger>
                    </>
                    : ""
                }
                <DropdownMenuContent className='w-full flex flex-col justify-center items-center'>
                    <DropdownMenuItem>
                        <SingleImageDropzone
                            disabled={isSubmitted}
                            onChange={uploadImage}
                            width={100}
                            height={100}
                        />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    );
} 