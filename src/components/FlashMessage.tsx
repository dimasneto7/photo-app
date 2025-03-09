'use client'

import { useEffect, useState } from 'react'

interface FlashMessageProps {
  message: string
  type: string
}
const FlashMessage: React.FC<FlashMessageProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed top-6 right-6 p-4 shadow-md ${
        type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
      }`}
    >
      {message}
    </div>
  )
}

export default FlashMessage
