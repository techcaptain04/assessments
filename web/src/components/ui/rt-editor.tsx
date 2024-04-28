'use client'

import { useCurrentEditor, EditorProvider, Extensions } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import StarterKit from '@tiptap/starter-kit'
import React, { useMemo, useState } from 'react'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import { Bold, ChevronDown, Code, Code2, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Minus, Pilcrow, Quote, Redo, Strikethrough, Undo } from 'lucide-react'
import { cn } from '@/lib/utils'
import HardBreak from '@tiptap/extension-hard-break'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className='flex space-x-3 border border-b-0 rounded-t-md p-2'>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex'>
            {
                (() => {
                    if (editor.isActive('heading', { level: 1 })) {
                        return <Heading1/>
                    }
                    if (editor.isActive('heading', { level: 2 })) {
                        return <Heading2/>
                    }
                    if (editor.isActive('heading', { level: 3 })) {
                        return <Heading3/>
                    }
                    
                    return <span className='font-bold'>Text</span>
                })()
            }
            <ChevronDown/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white min-w-0'>
            <DropdownMenuItem>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}
                >
                    <span>Text</span>
                </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <Heading1/>
                </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <Heading2/>
                </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    <Heading3/>
                </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={cn(
            editor.isActive('bold') ? 'is-active' : '',
        )}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <Italic/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Strikethrough/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <Code2/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
       <List/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <ListOrdered/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Code/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <Quote/>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus/>
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        br
      </button>
    </div>
  )
}

const extensions: Extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false
    },
  }),
]

interface RTEditorProps {
    onChange: (content: string) => void;
    value: string
    onBlur?: () => void;
}

const RTEditor = React.forwardRef((props: RTEditorProps, ref) => {
    const { onChange, value, onBlur } = props;

    return (
        <>
        <EditorProvider
            extensions={extensions} 
            slotBefore={<MenuBar/>} 
            content={value}
            onBlur={onBlur}
            onUpdate={({ editor, transaction }) => {
                let html = editor.getHTML();
                if (html === '<br>') {
                    html = ''
                }

                const newHTML = html.replace(/<p><\/p>/g, '\n')

                onChange(newHTML)
            }}
            editorProps={{
                attributes: {
                    class: 'border prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none py-5 px-4'
                },
            }}
        >
            <></>
        </EditorProvider>
        </>
    )
})
RTEditor.displayName = "RTEditor"

export default RTEditor;