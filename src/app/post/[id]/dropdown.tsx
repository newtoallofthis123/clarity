"use client";

import React from "react";
import { type FullPost, type FullUser } from "~/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = {
  post: FullPost | undefined;
  user: FullUser | undefined;
};

export default function DropDown({ post, user }: Props) {
  const delete_post = api.post.delete.useMutation();
  const mark_solved = api.post.markSolved.useMutation();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Admin Option</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button
              onClick={() => {
                delete_post.mutate({ id: post?.id ?? "" });
              }}
            >
              Delete Post
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              onClick={() => {
                mark_solved.mutate({ id: post?.id ?? "" });
              }}
            >
              Mark as Solved
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
