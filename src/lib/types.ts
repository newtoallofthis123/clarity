import { type Prisma } from "@prisma/client";

export type FullUser = Prisma.UserGetPayload<{
    include: {
        likes: true;
        posts: true;
        section: true;
    }
}>

export type FullPost = Prisma.PostGetPayload<{
    include: {
        likes: true;
        user: true;
    }
}>
