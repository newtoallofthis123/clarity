import { redirect } from "next/navigation";
import About from "~/components/base/about";
import Events from "~/components/base/events";
import Posts from "~/components/base/posts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = (await api.user.get.query({ id: session?.user.id })) ?? null;

  let posts = (await api.post.getAll.query({})).reverse() ?? null;

  posts = posts?.filter((post) => !post.solved);
  posts = posts?.filter((post) => post.user_id);

  return (
    <main className="px-4 py-2 text-neutral-800">
      <div className="flex flex-row justify-between gap-x-5">
        <div className="mr-0.5 mt-3 w-[25%]">
          <About user={user} />
        </div>
        <div className="w-3/6 bg-white pl-0.5">
          <Posts posts={posts} user={user} />
        </div>
        <div className="w-[25%]">
          <Events />
        </div>
      </div>
    </main>
  );
}
