'use client'

import { useActionState } from 'react'
import FlashMessage from './FlashMessage'
import { createPost } from '@/actions'
import ImagePreview from './ImagePreview'
import Label from './Label'
import Button from './Button'

const CreatePostForm: React.FC = () => {
  const [formState, formAction] = useActionState(createPost, {
    message: '',
    type: 'success',
  })
  return (
    <div className="max-w-[450px] mx-auto">
      {formState.message && (
        <FlashMessage message={formState.message} type={formState.type} />
      )}
      <form className="flex flex-col gap-4" action={formAction}>
        <ImagePreview />
        <div>
          <Label htmlFor="caption" text="Conteúdo do post" />
          <textarea
            id="caption"
            name="caption"
            placeholder="Digite a legenda da foto"
            className="h-32 bg-transparent border border-white p-2 rounded w-full text-sm focus:ring-0 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button type="submit" text="Criar Post" />
        </div>
      </form>
    </div>
  )
}

export default CreatePostForm
