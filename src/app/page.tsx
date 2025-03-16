import { getAllPosts } from '@/actions'
import Post from '@/components/Post'
import { auth } from 'auth'

export default async function Home() {
  const posts = await getAllPosts()

  const session = await auth()

  let userId = null

  if (session) {
    userId = session.user.userId
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 my-10">
      <h1 className="text-[2rem] leading-10 font-semibold">Posts</h1>
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="mt-8">
              <Post post={post} currentUserId={userId} />
            </div>
          ))
        ) : (
          <p>Ainda não há posts cadastrados</p>
        )}
      </div>
    </main>
  )
}
