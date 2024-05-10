import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createWorkspaceSchema } from "~/app/(app)/_validator/create-workspace";
import { updateWorkspaceNameSchema } from "~/app/(workspace)/workspace/[id]/settings/general/_validators/update-workspace-name";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const workspaceRouter = createTRPCRouter({
  create: privateProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      await db.transaction().execute(async ($) => {
        const workspace = await $.insertInto("workspace")
          .values({
            updated_at: new Date(),
            name: input.name,
          })
          .returning("id")
          .executeTakeFirst();

        if (!workspace?.id) {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        }

        await $.insertInto("account")
          .values({
            updated_at: new Date(),
            user_id: user.id,
            workspace_id: workspace.id,
            type: "CREATOR",
          })
          .executeTakeFirst();
      });
      return;
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { db }, input: { id } }) => {
      return await db
        .deleteFrom("workspace")
        .where("id", "=", id)
        .returning("id")
        .executeTakeFirst();
    }),

  updateName: privateProcedure
    .input(updateWorkspaceNameSchema)
    .mutation(async ({ ctx: { db }, input: { name, id } }) => {
      console.log(name);
      return await db
        .updateTable("workspace")
        .set({ name })
        .where("id", "=", id)
        .returning("name")
        .executeTakeFirstOrThrow();
    }),
});
