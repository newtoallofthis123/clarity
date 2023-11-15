import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { likeRouter } from "./routers/like";
import { eventRouter } from "./routers/event";
import { socialRouter } from "./routers/social";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  like: likeRouter,
  event: eventRouter,
  social: socialRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
