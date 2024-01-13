"use client"
import React from 'react'
import { BlockNoteView, useBlockNote, darkDefaultTheme } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useEdgeStore } from '../lib/edgestore';

const theme = {
    ...darkDefaultTheme,
    componentStyles: () => ({
        Editor: {
            ".ProseMirror": {
                backgroundColor: "bg-primary",
                color: "bg-secondary"
            },
        },
    }),
}

const Editor = ({
    editable,

    initialContent,
    onChange,
    onEditorContentChange,
}) => {

    const { edgestore } = useEdgeStore()

    const handleUpload = async (file) => {
        const uploadedFile = await edgestore.publicFiles.upload({ file })
        return uploadedFile.url
    }

    const editor = useBlockNote(
        {

            editable,

            onEditorContentChange,

            initialContent: initialContent ? JSON.parse(initialContent) : undefined,

            onEditorContentChange: (editor) => onChange(JSON.stringify(editor.topLevelBlocks, null, 2)),

            uploadFile: handleUpload

        }
    );



    return <BlockNoteView editor={editor} theme={theme} />
}


export default Editor

