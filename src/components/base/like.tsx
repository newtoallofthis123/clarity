"use client";

import React from "react";
import { type FullUser, type FullPost } from "~/lib/types";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
type Props = {
  user: FullUser | null;
  post: FullPost | null;
};

function findLikeId(user?: FullUser, post_id?: string) {
  let like_id = "";
  user?.likes.map((post) => {
    if (post.post_id === post_id) {
      like_id = post.id;
    }
  });
  return like_id;
}

function isLiked(user: FullUser | null, post_id?: string) {
  let liked = false;
  user?.likes.map((post) => {
    if (post.post_id === post_id) {
      liked = true;
    }
  });
  return liked;
}

export default function LikeComponent({ user, post }: Props) {
  const del_likes = api.like.delete.useMutation();
  const add_likes = api.like.create.useMutation();

  const upvote = api.user.upvote.useMutation();

  const router = useRouter();

  function handleLike(user: FullUser | null, post_id?: string) {
    if (!user) {
      return;
    }

    if (isLiked(user, post_id)) {
      const like_id = findLikeId(user, post_id);
      del_likes.mutate({
        like_id,
      });
    } else {
      add_likes.mutate({
        user_id: user.id,
        post_id: post_id ?? "",
      });

      upvote.mutate({
        user_id: user.id,
        to_add: 10,
      });
    }

    router.refresh();
  }

  return (
    <div>
      <button
        onClick={() => {
          handleLike(user, post?.id ?? undefined);
        }}
      >
        {isLiked(user, post?.id) ? (
          <i className="bi bi-caret-up-fill pr-2 text-2xl text-green-500"></i>
        ) : (
          <i className="bi bi-caret-up pr-2 text-2xl"></i>
        )}
      </button>
      {post?.likes.length}
    </div>
  );
}
