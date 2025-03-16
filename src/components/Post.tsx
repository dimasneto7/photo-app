'use client'

import Image from 'next/image'
import { Post as PostType } from '../../types/Post'
import LikedButton from './Post/LikedButton'
import { FiMessageSquare } from 'react-icons/fi'
import CommentModal from './Post/CommentModal'
import { useState } from 'react'

interface PostProps {
  post: PostType
  currentUserId: string
}

const Post: React.FC<PostProps> = ({ post, currentUserId }) => {
  let isLiked = false

  if (post.likes) {
    isLiked = post.likes.some((like) => like.userId === currentUserId)
  }

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  return (
    <div className="w-fit max-auto mb-6 p-4 border rounded shadow-sm">
      <Image
        src={post.imageUrl}
        alt={post.caption || 'Imagem do post'}
        className="w-[670px] h-[400px] object-cover mb-4 rounded"
        width={670}
        height={400}
      />
      {post.caption && (
        <p className="mb-2 text-sm font-medium">{post.caption}</p>
      )}
      <div className="flex items-center">
        {post.user.image && (
          <Image
            src={post.user.image}
            alt={post.user.name || 'Não tem nome do usuário'}
            className="w-10 h-10 object-cover rounded-full mr-3"
            width={40}
            height={40}
          />
        )}
        <p className="text-sm font-medium">{post.user.name}</p>
      </div>
      <div className="flex items-center mt-4">
        <LikedButton
          postId={post.id}
          initialLikesCount={post.likes?.length ? post.likes?.length : 0}
          isLiked={isLiked}
          currentUserId={currentUserId}
        />
        <button
          className="ml-4 flex items-center"
          onClick={() => setIsCommentModalOpen(true)}
        >
          <FiMessageSquare className="w-6 h-6 text-gray-500" />
          <span className="ml-1">
            {post.comments ? post.comments.length : 0}
          </span>
        </button>
      </div>
      <CommentModal
        post={post}
        currentUserId={currentUserId}
        isOpen={isCommentModalOpen}
        onRequestClose={() => setIsCommentModalOpen(false)}
      />
    </div>
  )
}

export default Post
