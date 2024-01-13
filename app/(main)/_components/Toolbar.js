
import { Smile, X } from 'lucide-react'
import React from 'react'
import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';
import { IconPicker } from '../../../components/icon-picker';
import Title, { TitleSimple } from './Title';
import SingleImageDropzoneUsage from './ImageUpload'
import LoadingSkeleton from './LoadingSkeleton';
import { api } from '../../../convex/_generated/api';
const Toolbar = ({ Icon, preview }) => {
  const params = useParams()
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  console.log(preview, 'preview');
  console.log(!preview, '!preview');
  const update = useMutation(api.documents.update)

  const handlIconChange = (selectedIcon) => {
    update({
      id: params.documentId,
      icon: selectedIcon
    })
  }
  const removeIcon = () => {
    update({
      id: params.documentId,
      icon: '',
    })
  }

  if (document === undefined) {
    return (
      <LoadingSkeleton />
    );
  }
  return (
    <>

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto z-10">

        <div className='flex group items-center gap-2 text-[40px] w-full ml-4 mt-1 justify-start md:justify-start flex-wrap'>
          {document?.icon && preview &&
            <p>
              {document.icon}
            </p>
          }
          {document?.icon && !preview &&
            <>
              <IconPicker
                onChange={(e) => handlIconChange(e)}
              >
                {document.icon}
              </IconPicker>
              <Button
                onClick={removeIcon}
                className="text-muted-foreground group-hover:opacity-100 opacity-30 text-xs p-2 rounded-full w-fit h-8"
                variant="secondary"
                size="sm">
                <X
                  className="h-4 w-4" />
              </Button>
            </>
          }
          {!preview && !document?.icon &&
            <IconPicker
              onChange={(e) => handlIconChange(e)}>
              {document.icon}
              <Button
                className="text-muted-foreground group-hover:opacity-100 opacity-30 text-xs flex"
                variant="secondary"
                size="sm">
                <Smile className="h-4 w-4 mr-2" />Add icon
              </Button>
            </IconPicker>
          }
          {document?.coverImage ?
            <SingleImageDropzoneUsage imageURL={document.coverImage} imagePreview={preview} />
            :
            <SingleImageDropzoneUsage imageURL='' imagePreview={preview} />
          }
        </div>
        <TitleSimple theTitle={document?.title} preview={preview} />
      </div>
    </>
  )
}

export default Toolbar
