import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
        return ctx.db.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                likes: true,
                posts: true,
                section: true,
            },
        });
    }),

  upvote: protectedProcedure
    .input(z.object({
        user_id: z.string(),
        to_add: z.number(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.db.user.update({
            where: {
                id: input.user_id,
            },
            data: {
                karma: {
                    increment: input.to_add,
                },
            },
        });
    }),
});
