"use client";

import React, { useRef, useState } from 'react'
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Button } from '../../../components/ui/button';

const Title = ({ theTitle, Icon, preview }) => {
  const params = useParams()
  const inputRef = useRef(null)
  const update = useMutation(api.documents.update)
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(theTitle)

  const enableInput = () => {
    console.log(preview);
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0);
  }

  const handleChange = (value) => {
    setTitleValue(value)
    update({
      id: params.documentId,
      title: value || "Untitled"
    })
  }

  const disableInput = () => setIsEditing(false)

  const onKeyDown = (event) => (event.key === 'Enter') ? disableInput() : ""
  return (
    <div className='flex justify-between items-center gap-x-1'>
      <span
        className='text-xl'
      >{Icon}</span>
      {isEditing
        ?
        <input
          className='text-[20px] focus:outline-none bg-transparent font-medium h-10 rounded-md px-3'
          ref={inputRef}
          value={titleValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
        />
        :
        <Button
          className='text-[20px] h-10 disabled:opacity-100'
          onClick={enableInput}
          disabled={preview}
          variant='ghost'
          size='sm'
        >{theTitle}</Button>
      }
    </div>
  )
}
export default Title

export const TitleSimple = ({ theTitle, preview }) => {
  const params = useParams()
  const inputRef = useRef(null)
  const update = useMutation(api.documents.update)
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(theTitle)

  const enableInput = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    }, 0);
  }

  const handleChange = (value) => {
    setTitleValue(value)
    update({
      id: params.documentId,
      title: value || "Untitled"
    })
  }

  const disableInput = () => setIsEditing(false)

  const onKeyDown = (event) => (event.key === 'Enter') && disableInput()


  return (

    <div className="flex items-start justify-between  my-3">
      <div className='flex justify-between items-center gap-x-1 h-12 rounded-md'>
        {
          isEditing
            ?
            <input
              className={'text-[40px] focus:outline-none bg-transparent font-medium h-full px-3'}
              ref={inputRef}
              value={titleValue}
              // placeholder={titleValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={disableInput}
              onKeyDown={onKeyDown}
            />
            :
            <Button
              className='text-[40px]  h-10 disabled:opacity-100'
              onClick={enableInput}
              disabled={preview}
              variant='ghost'
              size='sm'
            >{theTitle}</Button>
        }
      </div>
    </div>
  )
}
