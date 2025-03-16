'use client'

import { likePost } from '@/actions'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { BsFillHeartFill, BsHeart } from 'react-icons/bs'

interface LikedButtonProps {
  postId: string
  initialLikesCount: number
  isLiked: boolean
  currentUserId: string
}

const LikedButton: React.FC<LikedButtonProps> = ({
  postId,
  initialLikesCount,
  isLiked,
  currentUserId,
}) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount)
  const [liked, setLiked] = useState(isLiked)

  const handleLike = async () => {
    if (!currentUserId) {
      return redirect('/signin')
    }

    await likePost(postId, currentUserId)

    setLiked(!liked)
    setLikesCount(liked ? likesCount - 1 : likesCount + 1)
  }

  return (
    <div className="flex items-center">
      <button className="mr-2" onClick={handleLike}>
        {liked ? (
          <BsFillHeartFill className="w-6 h-6 text-red-500" />
        ) : (
          <BsHeart className="w-6 h-6 text-gray-500" />
        )}
      </button>
      <span>{likesCount}</span>
    </div>
  )
}

export default LikedButton
