import { z } from "zod";

import {
  adminProdcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  superAdminProdcedure,
} from "@/server/api/trpc";

export const organizationsRouter = createTRPCRouter({
  getAllOrganizations: adminProdcedure.query(async ({ ctx }) => {
    const organizations = await ctx.db.organization.findMany({});
    return organizations;
  }),
  createOrganization: adminProdcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const organization = await ctx.db.organization.create({
        data: {
          name: input.name,
        },
      });
      return organization;
    }),
  getProjects: protectedProcedure
    .input(z.object({ orgId: z.string() }))
    .query(async ({ ctx, input }) => {
      const projects = await ctx.db.project.findMany({
        where: {
          organizationId: input.orgId,
        },
        include: {
          userProjects: {
            include: {
              user: true,
            },
          },
        },
      });
      return projects;
    }),
  createProject: protectedProcedure
    .input(
      z.object({
        orgId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          organizationId: input.orgId,
        },
      });
      return project;
    }),
  inviteUpperManagement: protectedProcedure
    .input(
      z.object({
        orgId: z.string(),
        emails: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUsers = await ctx.db.user.findMany({
        where: {
          email: {
            in: input.emails,
          },
        },
      });
      const existingEmails = existingUsers.map((user) => user.email);
      const newEmails = input.emails.filter(
        (email) => !existingEmails.includes(email),
      );
      const newUsers = await ctx.db.user.createMany({
        data: newEmails.map((email) => ({ email })),
      });
      const users = await ctx.db.user.findMany({
        where: {
          email: {
            in: input.emails,
          },
        },
      });
      const orgUsers = await ctx.db.userOrganization.createMany({
        data: users.map((user) => ({
          userId: user.id,
          organizationId: input.orgId,
          role: "upperManagementStakeholder",
        })),
      });
    }),
});
