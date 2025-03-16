'use client'

import { useState } from 'react'
import Modal from 'react-modal'
import { Post as PostType } from '../../../types/Post'
import FlashMessage from '../FlashMessage'
import Button from '../Button'
import { addComment } from '@/actions'
import { GrClose } from 'react-icons/gr'
import Image from 'next/image'

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

    await addComment(post.id, currentUserId, content)

    setFlashMessage({
      message: 'O comentário adicionado com sucesso!',
      type: 'success',
    })

    setContent('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Comentários"
      ariaHideApp={false}
      className="w-[704px] mx-auto rounded border bg-zinc-900 border-zinc-300 mt-28"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Comentários</h2>
          <button
            onClick={onRequestClose}
            className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full"
          >
            <GrClose />
          </button>
        </div>
        {flashMessage && (
          <FlashMessage
            message={flashMessage.message}
            type={flashMessage.type}
          />
        )}
        <div className="mb-4 flex flex-col gap-4">
          {post.comments && post.comments.length === 0 && (
            <p className="text-sm font-medium">Nenhum comentário ainda</p>
          )}
          {post.comments &&
            post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2 items-end">
                {comment.user.image && (
                  <Image
                    src={comment.user.image}
                    alt={comment.user.name || ''}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-full mr-3"
                  />
                )}
                <p className="text-sm text-gray-500">
                  <strong>
                    {comment.user.name}: {comment.content}
                  </strong>
                </p>
              </div>
            ))}
        </div>
        {currentUserId && (
          <div className="mb-4 flex flex-col gap-6">
            <textarea
              className="w-full h-32 p-2 bg-zinc-800 border border-zinc-500 rounded text-sm font-medium"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Adicione um comentário"
            ></textarea>
            <div className="flex justify-end">
              <Button
                type="button"
                text="Comentar"
                onClick={handleAddComment}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default CommentModal
