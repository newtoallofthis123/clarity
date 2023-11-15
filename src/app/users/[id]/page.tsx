import Image from "next/image";
import React from "react";
import Posts from "~/components/base/posts";
import SocialBtn from "~/components/base/social";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserPage({ params: { id } }: Props) {
  const user = await api.user.get.query({ id });

  const posts = await api.post.getPostByUser.query({ id });

  const social = await api.social.get.query({ user_id: id });

  return (
    <main className="p-2">
      <div className="flex flex-row justify-between gap-x-4">
        <div className="ml-4 w-[24%] pr-2">
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-b-4 border-black">
            <div className="py-2">
              <Image
                src={"https://i.pravatar.cc/300?u=" + user?.name}
                alt={user?.name ?? "User Profile Picture"}
                width={250}
                height={250}
                className="rounded-full"
              />
            </div>
            <div>
              <h1 className="pb-1 text-3xl font-bold">{user?.name}</h1>
              <p>{social?.bio}</p>
            </div>
            <div className="w-full px-3 py-2">
              {social?.twitter && (
                <SocialBtn
                  url={social?.twitter ?? ""}
                  name="Twitter"
                  icon="bi bi-twitter"
                />
              )}
              {social?.instagram && (
                <SocialBtn
                  url={social?.instagram ?? ""}
                  name="Instagram"
                  icon="bi bi-instagram"
                />
              )}
              {social?.facebook && (
                <SocialBtn
                  url={social?.facebook ?? ""}
                  name="Facebook"
                  icon="bi bi-facebook"
                />
              )}
              {social?.github && (
                <SocialBtn
                  url={social?.github ?? ""}
                  name="GitHub"
                  icon="bi bi-github"
                />
              )}
              {social?.linkedin && (
                <SocialBtn
                  url={social?.linkedin ?? ""}
                  name="LinkedIn"
                  icon="bi bi-linkedin"
                />
              )}
              {social?.youtube && (
                <SocialBtn
                  url={social?.youtube ?? ""}
                  name="YouTube"
                  icon="bi bi-youtube"
                />
              )}
              {social?.twitch && (
                <SocialBtn
                  url={social?.twitch ?? ""}
                  name="Twitch"
                  icon="bi bi-twitch"
                />
              )}
              {social?.website && (
                <SocialBtn
                  url={social?.website ?? ""}
                  name="Website"
                  icon="bi bi-globe"
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="flex flex-col justify-center">
            <div className="">
              <p className="pb-5 text-xl">You have earned</p>
              <h1 className=" text-6xl font-black">✨ {user?.karma} Stars</h1>
              <p className="pt-6 text-xl">Keep up the good work!</p>
              <div className="pt-4">
                <h2 className="text-2xl font-bold">Stats:</h2>
                <div className="leading-relazed text-lg">
                  <p>
                    <span className="underline">Posts:</span>
                    <span> {posts?.length}</span>
                  </p>
                  <p>
                    <span className="underline">Comments:</span>
                    <span> {posts?.length}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-3/3">
              <ScrollArea className="h-[50%] w-full">
                <Posts posts={posts} user={user} />
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="w-[15%]"></div>
      </div>
    </main>
  );
}
