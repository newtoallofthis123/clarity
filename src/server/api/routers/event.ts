import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        date: z.date(),
        location: z.string(),
        link: z.string(),
        organizer: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.event.create({
        data: {
          title: input.title,
          content: input.content,
          date: input.date,
          location: input.location,
          link: input.link,
          organizerId: input.organizer,
        },
      });
    }),
  addRSVP: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        user_id: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.event.update({
        where: {
          id: input.eventId,
        },
        data: {
          rsvp: {
            connect: {
              id: input.user_id,
            },
          },
        },
      });
    }),
  getAllRSVPs: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.event.findUnique({
        where: {
          id: input.id,
        },
        include: {
          rsvp: true,
          organizer: true,
        },
      });
    }),
  getAllEvents: protectedProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.db.event.findMany({
      include: {
        rsvp: true,
        organizer: true,
      },
    });
  }),
  getEvent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.event.findFirst({
        where: {
          id: input.id,
        },
        include: {
          rsvp: true,
        },
      });
    }),
});
