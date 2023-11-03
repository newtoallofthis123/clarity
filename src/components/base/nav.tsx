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
import { Button } from "../ui/button";
import Image from "next/image";
import { type User } from "@prisma/client";
import { cookies } from "next/headers";

type Props = {
  title?: string;
  session?: Session;
  user?: User;
};

export default function Nav({ session, user, title = "GRIET" }: Props) {

  return (
    <div className="px-3 py-2">
      <nav className="flex w-full flex-row items-center justify-between rounded-xl border-2 border-neutral-800 border-b-4 border-r-4 p-3">
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
            <span className="text-neutral-600">GRIET | Clarity</span>
          </a>
        </div>
        <div className="flex flex-row items-center gap-x-6 text-lg text-neutral-600">
          <Link href="/popular">👀 Popular</Link>
          <Link href="/forums">🎤 Forums</Link>
          <Link href="/notice">📍 Notice Board</Link>
          <Link href="/about">❓ About</Link>
          <div className="flex flex-row items-center justify-center gap-x-4 pl-8">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row items-center justify-center gap-x-4">
                  <Avatar>
                    <AvatarImage
                      width={10}
                      height={10}
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
                <DropdownMenuItem>My Posts</DropdownMenuItem>
                <DropdownMenuItem>Answers</DropdownMenuItem>
                <DropdownMenuItem>Karma</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="px-3 py-4 text-lg" variant="default">
              Create
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
