import React from "react";
import About from "~/components/base/about";
import Comment from "~/components/base/comment";
import LikeComponent from "~/components/base/like";
import Posts from "~/components/base/posts";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params: { id } }: Props) {
  const post = (await api.post.get.query({ id: id })) ?? undefined;

  const session = await getServerAuthSession();

  const comments = await api.post.getComments.query({ id: id });

  const user =
    (await api.user.get.query({ id: session?.user.id ?? "" })) ?? undefined;
  return (
    <main className="flex flex-row justify-between gap-x-5">
      <div className="ml-4 w-[20%]">
        <About user={user} />
      </div>
      <div className="w-[60%] py-0">
        {post?.post_type == "comment" && (
          <Button className="my-4">
            <a href={"/post/" + post?.commentTo}>
              <p className="text-lg"><i className="bi bi-arrow-left"></i> Go Back</p>
            </a>
          </Button>
        )}
        <div className="rounded-lg  border-2 border-b-4 border-neutral-800 py-0 leading-relaxed">
          <div className="flex flex-row items-center justify-between gap-x-4 border-b-2 border-black px-4 py-2">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <Avatar className="my-0.5 h-14 w-14">
                <AvatarImage
                  src={"https://i.pravatar.cc/300?u=" + post?.user.name}
                />
                <AvatarFallback>{post?.user.name}</AvatarFallback>
              </Avatar>
              <div>
                <p className="p-0 text-xl font-bold">{post?.user.name}</p>
                <p className="text-sm">{post?.createdAt.toDateString()}</p>
              </div>
            </div>
            <div className="flex w-[10%] flex-col justify-center gap-y-2">
              {!post?.solved && post?.post_type == "question" && (
                <Badge className="bg-red-600">Unsolved</Badge>
              )}
              {post?.post_type == "comment" && (
                <Badge className="bg-yellow-600">Comment</Badge>
              )}
              {post?.post_type == "comment" && (
                <Badge className="bg-blue-600">Discuss</Badge>
              )}
              {post?.post_type == "question" && (
                <Badge className="bg-green-600">Answer</Badge>
              )}
              {post?.solved && <Badge className="bg-green-600">Solved</Badge>}
            </div>
          </div>
          <div className="px-5 py-3">
            <h1 className="pb-2 text-3xl font-bold">{post?.title}</h1>
            <p className="text-lg">{post?.content}</p>
          </div>
          <div className="flex flex-row justify-between border-t-2 border-black p-2 text-lg">
            <div className="flex flex-row items-center justify-center pb-0.5">
              <div className="px-3 text-lg text-neutral-800">
                <LikeComponent user={user} post={post} />
              </div>
              <p className="px-3 text-lg text-neutral-800">
                <button>
                  <i className="bi bi-chat pr-2"></i>
                </button>
                {comments.length}
              </p>
              <p className="px-3 text-lg text-neutral-800">
                <button>
                  <i className="bi bi-share pr-2"></i>
                </button>
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-x-2">
              {(post?.likes.length ?? 0) > 0 ? (
                <>🔥+{(post?.likes.length ?? 0) * 10} Karma</>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div>
          <Comment
            user_id={user?.id ?? ""}
            name={user?.name ?? "Anonymus"}
            post_id={id}
          />
          <Posts allowComments={true} posts={comments} user={user} />
        </div>
      </div>
      <div className="w-[20%]"></div>
    </main>
  );
}
