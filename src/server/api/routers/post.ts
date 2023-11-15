import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        user_id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          user_id: input.user_id,
        },
      });
    }),

  getPostByUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          user_id: input.id,
        },
        include: {
          likes: true,
          user: true,
        },
      });
    }),

  getComments: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: {
          commentTo: input.id,
        },
        include: {
          likes: true,
          user: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({
        where: {
          id: input.id,
        },
      });
    }),

  markSolved: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          solved: true,
        },
      });
    }),

  createComment: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        user_id: z.string(),
        commentTo: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          user_id: input.user_id,
          commentTo: input.commentTo,
          post_type: "comment",
        },
      });
    }),

  increaseCommentLength: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.update({
        where: {
          id: input.id,
        },
        data: {
          commentLength: {
            increment: 1,
          },
        },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          id: input.id,
        },
        include: {
          likes: true,
          user: true,
        },
      });
    }),
  getAll: protectedProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.db.post.findMany({
      include: {
        likes: true,
        user: true,
      },
    });
  }),
});
