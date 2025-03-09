'use client'

import { updateUserProfile } from '@/actions'
import { User } from '../../types/User'
import Label from './Label'
import Button from './Button'
import ImagePreview from './ImagePreview'
import { useActionState } from 'react'
import FlashMessage from './FlashMessage'

type ProfileFormProps = {
  user: User
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [formState, formAction] = useActionState(updateUserProfile, {
    message: '',
    type: 'success',
  })
  return (
    <div className="max-w-[450px] mx-auto">
      {formState.message && (
        <FlashMessage message={formState.message} type={formState.type} />
      )}
      <form
        className="flex flex-col gap-4"
        action={formAction}
        // encType="multipart/form-data"
      >
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Label htmlFor="name" text="nome" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite o seu nome"
            defaultValue={user.name || ''}
            className="bg-transparent border border-white p-2 rounded w-full text-sm focus:ring-0 focus:outline-none"
          />
        </div>
        <ImagePreview />
        <div className="flex justify-end">
          <Button type="submit" text="salvar" />
        </div>
      </form>
    </div>
  )
}

export default ProfileForm
