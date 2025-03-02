import { auth, signOut } from 'auth'
import Link from 'next/link'

const Navbar = async () => {
  const session = await auth()

  return (
    <div className="bg-zinc-950 text-white p-4 flex justify-between items-center border-b-zinc-800 border-b">
      <Link href="/" className="text-white text-lg font-bold">
        Home
      </Link>
      <div>
        {session && session.user ? (
          <div className="flex gap-4 items-center">
            <span>{session?.user.name}</span>
            <form
              action={async () => {
                'use server'
                await signOut()
              }}
            >
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded">
                Sair
              </button>
            </form>
          </div>
        ) : (
          <Link
            href="/signin"
            className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-4 rounded"
          >
            Entrar
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
