'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { Post as PostType } from '../../../types/Post'
import FlashMessage from '../FlashMessage'
import Button from '../Button'

interface CommentModalProps {
  post: PostType
  currentUserId?: string
  isOpen: boolean
  onRequestClose: () => void
}

const CommentModal: React.FC<CommentModalProps> = ({
  post,
  currentUserId,
  isOpen,
  onRequestClose,
}) => {
  const [content, setContent] = useState('')

  const [flashMessage, setFlashMessage] = useState<{
    message: string
    type: 'success' | 'error'
  } | null>(null)

  const handleAddComment = async () => {
    if (!currentUserId) {
      window.location.href = '/'
      return
    }

    if (!content.trim()) {
      setFlashMessage({
        message: 'O comentário não pode estar vazio',
        type: 'error',
      })
      return
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comentários"
      ariaHideApp={false}
      className="w-[704px] mx-auto bg-white rounded border border-zinc-300"
    >
      {flashMessage && (
        <FlashMessage message={flashMessage.message} type={flashMessage.type} />
      )}
      <p>Conteúdo</p>
      {currentUserId && (
        <div className="mb-4 flex flex-col gap-6">
          <textarea
            className="w-full h-32 p-2 border-zinc-300 rounded text-sm font-medium"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Adicione um comentário"
          ></textarea>
          <div className="flex justify-end">
            <Button type="button" text="Comentar" onClick={handleAddComment} />
          </div>
        </div>
      )}
    </Modal>
  )
}

export default CommentModal
