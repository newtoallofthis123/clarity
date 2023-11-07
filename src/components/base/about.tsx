import React from 'react'
import { type FullUser } from '~/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CreatePost from './post';

type Props = {
  user?: FullUser;
};

export default function About({user}: Props) {
  return (
    <div className="rounded-lg border-2 border-neutral-200 bg-neutral-50 px-1 py-3 mt-3 shadow-sm hover:shadow-md transition duration-300 ease-in-out">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Avatar className="my-0.5 h-24 w-24">
          <AvatarImage src={"https://i.pravatar.cc/300?u=" + user?.name} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <span className="mb-2 text-3xl font-bold text-neutral-800">
          {user?.name}
        </span>
      </div>
      <div className="text-center">
        <span>
          {user?.posts.length} {user?.posts.length === 1 ? "post" : "posts"}
        </span>{" "}
        | <span>✨ {user?.karma} Stars</span> |{" "}
        <span>👨‍🎓 {user?.section.code}</span>
      </div>
      <div className="mx-1 mt-4">
        <p className="my-2 ml-3 text-lg text-neutral-800"></p>
      </div>
      <div>
        <CreatePost user={user} />
      </div>
    </div>
  );
}
