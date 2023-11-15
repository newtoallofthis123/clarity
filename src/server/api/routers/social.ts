import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const socialRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        user_id: z.string(),
        github: z.string().optional(),
        twitter: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
        youtube: z.string().optional(),
        twitch: z.string().optional(),
        website: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.social.create({
        data: {
          user_id: input.user_id,
          github: input.github,
          twitter: input.twitter,
          linkedin: input.linkedin,
          instagram: input.instagram,
          youtube: input.youtube,
          twitch: input.twitch,
          website: input.website,
        },
      });
    }),
  get: publicProcedure
    .input(
      z.object({
        user_id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.social.findUnique({
        where: {
          user_id: input.user_id,
        },
      });
    }),
});
