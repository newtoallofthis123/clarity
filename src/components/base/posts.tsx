"use client";

import React from "react";
import { type FullUser, type FullPost } from "~/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeComponent from "./like";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  posts: FullPost[];
  user: FullUser;
  allowComments?: boolean;
};

export default function Posts({ posts, user, allowComments=false }: Props) {
  const router = useRouter();
  return (
    <div className="mt-1">
      {posts.map((post) => {
        if (post.post_type == "comment" && !allowComments) {
          return ""
        }
        return (
          <div
            className="mb-4 mt-0 translate-y-4 cursor-pointer rounded-lg border-2 border-b-4 border-black text-lg transition duration-500 ease-in-out hover:bg-gray-100"
            key={post.id}
          >
            <div
              onClick={() => {
                router.push("/post/" + post.id);
              }}
            >
              <div className="flex flex-row items-center gap-x-4 border-b-2 border-black px-4 py-2">
                <div className="flex flex-row items-center justify-center gap-x-2">
                  <Avatar className="my-0.5 h-14 w-14">
                    <AvatarImage
                      src={"https://i.pravatar.cc/300?u=" + post.user.name}
                    />
                    <AvatarFallback>{post.user.name}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="p-0 text-xl font-bold">{post.user.name}</p>
                    <p className="text-sm">{post.createdAt.toDateString()}</p>
                  </div>
                </div>
              </div>
              <p className="px-3 py-2 text-xl font-bold">{post.title}</p>
              <p className="px-3 pb-2 text-neutral-800">{post.content}</p>
            </div>
            <div className="flex flex-row items-center justify-between border-t-2 border-black p-2 text-lg">
              <div className="flex flex-row">
                <div className="px-3 text-lg text-neutral-800">
                  <LikeComponent user={user} post={post} />
                </div>
                <p className="px-3 text-lg text-neutral-800">
                  <button>
                    <a href={"/post/" + post.id}>
                      <i className="bi bi-chat pr-2"></i>
                    </a>
                  </button>
                  {post.commentLength}
                </p>
              </div>
              <div>
                <Button>
                  {/* <i className="bi bi-share pr-2"></i> */}
                  <a className="font-bold" href={"/post/" + post.id}>
                    View Responses <i className="bi bi-arrow-right pr-2"></i>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
