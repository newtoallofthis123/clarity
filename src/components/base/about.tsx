import Image from 'next/image';
import React from 'react'
import { type FullUser } from '~/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CreatePost from './post';

type Props = {
  user?: FullUser;
};

export default function About({user}: Props) {
  return (
    <div className="bg-neutral-50 rounded-lg border-2 border-neutral-800 border-b-4 border-r-4 px-1 py-3">
      <div className="flex flex-col items-center justify-center gap-y-4">
        <Avatar className='w-24 h-24 my-0.5'>
          <AvatarImage
            src={"https://i.pravatar.cc/300?u=" + user?.name} 
          />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <span className="text-3xl font-bold text-neutral-800 mb-2">
          {user?.name}
        </span>
      </div>
      <div className="text-center">
        <span>
          {user?.posts.length} {user?.posts.length === 1 ? "post" : "posts"}
        </span>{" "}
        | <span>🌸 {user?.karma} Karma</span>
      </div>
      <div className='mt-4 mx-1'>
        <p className='text-lg my-2 ml-3 text-neutral-800'>
        </p>
      </div>
    </div>
  );
}