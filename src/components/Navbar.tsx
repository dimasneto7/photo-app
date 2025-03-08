import { getUserByEmail } from '@/actions'
import { auth, signOut } from 'auth'
import Image from 'next/image'
import Link from 'next/link'
import Button from './Button'
import ButtonLink from './ButtonLink'

const Navbar = async () => {
  const session = await auth()

  const user = await getUserByEmail(session?.user.email)

  return (
    <div className="bg-zinc-950 text-white px-10 py-5 flex justify-between items-center border-b-zinc-800 border-b">
      <Link href="/" className="text-white text-lg font-bold">
        Photo App
      </Link>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <p className="font-medium">{user?.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`Perfil de ${user.name}`}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            )}
            <Link href={'/profile'} className="font-medium hover:font-semibold">
              Perfil
            </Link>
            <Link
              href={'/posts/new'}
              className="font-medium hover:font-semibold"
            >
              Criar Postagem
            </Link>
            <Link
              href={'/my-posts'}
              className="font-medium hover:font-semibold"
            >
              Minhas Postagem
            </Link>

            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <Button text="Sair" danger={false} type="submit" />
            </form>
          </div>
        ) : (
          <ButtonLink url="/signin" text="Entrar" />
        )}
      </div>
    </div>
  )
}

export default Navbar
