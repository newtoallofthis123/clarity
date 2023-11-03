import { redirect } from "next/navigation";
import About from "~/components/base/about";
import Posts from "~/components/base/posts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await api.user.get.query({ id: session?.user.id }) ?? undefined;

  const posts = (await api.post.getAll.query({})).reverse();

  return (
    <main className="px-4 py-2 text-neutral-800">
      <div className="flex flex-row gap-x-5 justify-between">
        <div className="w-[25%] mr-0.5 mt-3">
          <About user={user} />
        </div>
        <div className="pl-0.5 w-3/6 bg-white">
          <Posts posts={posts} user={user} />
        </div>
        <div className="w-[25%]"></div>
      </div>
    </main>
  );
}
