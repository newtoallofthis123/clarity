"use client"

import { type Session } from "next-auth";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { type User } from "@prisma/client";

type Props = {
  title?: string;
  session?: Session;
  user?: User;
};

export default function Nav({ session, user, title = "Clarity" }: Props) {

  return (
    <div className="px-3 py-2">
      <nav className="flex w-full flex-row items-center justify-between rounded-xl border-2 border-neutral-200 p-3 shadow-sm hover:shadow-md transition duration-300 ease-in-out">
        <div className="flex w-2/5 flex-row items-end">
          <Image
            alt="Logo"
            className="mr-2"
            src="/griet.png"
            width={42}
            height={42}
          />
          <a href="/">
            <span className="pr-2 text-4xl font-black">
              {user?.sectionId ?? title}
            </span>{" "}
            <span className="text-neutral-600">
              Clarity
            </span>
          </a>
        </div>
        <div className="flex flex-row items-center gap-x-6 text-lg text-neutral-600">
          <Link href="/events">👀 Events</Link>
          <Link href="/">🎤 Forums</Link>
          <Link href="/notice">📍 Notice Board</Link>
          <Link href="https://github.com/newtoallofthis123/clarity">❓ About</Link>
          <div className="flex flex-row items-center justify-center gap-x-4 pl-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row items-center justify-center gap-x-2">
                  <Avatar>
                    <AvatarImage
                      width={12}
                      height={12}
                      src={"https://i.pravatar.cc/300?u=" + user?.name}
                    />
                    <AvatarFallback>{session?.user.name}</AvatarFallback>
                  </Avatar>
                  <span className="text-xl font-bold">{user?.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">
                    Home
                  </Link>  
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/comments/[id]" as={"/comments/" + user?.id}>
                    Questions
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/users/[id]" as={"/users/" + user?.id}>
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
}
