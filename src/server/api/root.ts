import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { likeRouter } from "./routers/like";
import { upvoteRouter } from "./routers/upvote";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  like: likeRouter,
  upvote: upvoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
