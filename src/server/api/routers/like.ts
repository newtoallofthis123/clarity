import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
        post_id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.like.create({
        data: {
          user_id: input.user_id,
          post_id: input.post_id,
        },
      });
    }),

  get: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
        post_id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.like.findMany({
        where: {
          user_id: input.user_id,
          post_id: input.post_id,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        like_id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.like.delete({
        where: {
          id: input.like_id,
        },
      });
    }),
});
