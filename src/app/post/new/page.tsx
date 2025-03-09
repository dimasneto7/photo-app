import CreatePostForm from '@/components/CreatePostForm'
import { auth } from 'auth'
import { redirect } from 'next/navigation'

const NewPostPage = async () => {
  const session = await auth()

  if (!session) return redirect('/')

  return (
    <div className="w-[35rem] mx-auto p-4 my-10">
      <h1 className="text-[2rem] leading-10 font-semibold text-center">
        Criar Novo Post
      </h1>
      <div className="border border-wite-300 p-4 rounded mt-8">
        <CreatePostForm />
      </div>
    </div>
  )
}

export default NewPostPage
