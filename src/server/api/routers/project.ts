import { z } from "zod";

import {
  adminProdcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  superAdminProdcedure,
} from "@/server/api/trpc";

export const projectRouter = createTRPCRouter({
  inviteStakeholder: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (existingUser) {
        await ctx.db.userProject.create({
          data: {
            projectId: input.projectId,
            userId: existingUser.id,
          },
        });
      } else {
        await ctx.db.user.create({
          data: {
            email: input.email,
            systemRole: "user",
            userProjects: {
              create: {
                projectId: input.projectId,
              },
            },
          },
        });
      }
    }),
  getStakeholders: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userProjects = await ctx.db.userProject.findMany({
        where: {
          projectId: input.projectId,
        },
        include: {
          user: true,
        },
      });
      return userProjects.map((userProject) => userProject.user);
    }),
});
