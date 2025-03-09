'use server'

import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

type FormState = {
  message: string
  type: string
}

export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) return null

  const user = await prisma.user.findFirst({
    where: { email: email },
  })

  return user
}

export async function updateUserProfile(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth()

  if (!session) redirect('/')

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const imageFile = formData.get('image') as File

  if (session.user.userId !== id) {
    throw new Error('Não autorizado!')
  }

  if (name.length < 5) {
    return { message: 'Nome precisa ter no mínimo 5 caracteres', type: 'error' }
  }

  let imageUrl

  if (imageFile && imageFile.name !== 'undefined') {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    // criar o diretorio
    await fs.mkdir(uploadDir, { recursive: true })
    const filePath = path.join(uploadDir, imageFile.name)
    const arrayBuffer = await imageFile.arrayBuffer()

    // criar o arquivo no diretorio
    await fs.writeFile(filePath, Buffer.from(arrayBuffer))

    imageUrl = `/uploads/${imageFile.name}`
  }

  const dataToUpdate = imageUrl ? { name, image: imageUrl } : { name }

  await prisma.user.update({
    where: { id },
    data: dataToUpdate,
  })

  revalidatePath('/profile')

  return { message: 'Perfil atualizado com sucesso!', type: 'success' }
}

export async function createPost(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth()

  if (!session) redirect('/')

  const caption = formData.get('caption') as string
  const imageFile = formData.get('image') as File

  if (!caption || imageFile.size === 0) {
    return { message: 'Legenda e foto são obrigatórios', type: 'error' }
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  // criar o diretorio
  await fs.mkdir(uploadDir, { recursive: true })
  const filePath = path.join(uploadDir, imageFile.name)
  const arrayBuffer = await imageFile.arrayBuffer()

  // criar o arquivo no diretorio
  await fs.writeFile(filePath, Buffer.from(arrayBuffer))

  const imageUrl = `/uploads/${imageFile.name}`

  await prisma.post.create({
    data: {
      imageUrl,
      caption,
      userId: session.user.userId,
    },
  })

  revalidatePath('/')

  redirect('/')
}

export async function getUserPosts(userId: string) {
  const session = await auth()

  if (!session) redirect('/')

  if (session.user.userId !== userId) {
    throw new Error('Não autorizado')
  }

  return await prisma.post.findMany({
    where: { userId },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
