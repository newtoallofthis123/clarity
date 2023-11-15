"use client"

import React from 'react'
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { api } from '~/trpc/react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

type Props = {
  post_id: string;
  user_id: string;
  name: string;
}

export default function Comment({ post_id, name, user_id }: Props) {
  
  const router = useRouter()

  const [comment, setComment] = React.useState("")
  const [title, setTitle] = React.useState("")

  const comment_api = api.post.createComment.useMutation()

  const increase_comment_count = api.post.increaseCommentLength.useMutation()

  function handleSubmit() {
    comment_api.mutate({
      commentTo: post_id,
      title: title,
      user_id: user_id,
      content: comment
    })

    setComment("")
    setTitle("")

    increase_comment_count.mutate({
      id: post_id
    })    

    router.refresh()
  }
  
  return (
    <div className="mt-4">
      <div className="flex flex-col justify-center">
        <div className="border-2 rounded-md border-neutral-200">
          <Input 
            className="w-full border-0 text-xl border-b-2 border-neutral-200 rounded-none px-2 py-3"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <Textarea
            className="w-full border-0 text-xl "
            value={comment}
            placeholder="Start typing to comment, be careful of our community guidelines and be nice!"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-between py-1">
          <Button
            className="p-2 text-lg"
            onClick={handleSubmit}
          >
            Comment
          </Button>
          <div>
            {" "}
            🟢 Connected as <span className="underline">{name}</span> at{" "}
            {new Date().getHours()}:{new Date().getMinutes()}
            {new Date().getHours() > 12 ? " PM" : " AM"}
          </div>
        </div>
      </div>
    </div>
  );
}