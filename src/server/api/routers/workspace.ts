import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createWorkspaceSchema } from "~/app/(app)/_validator/create-workspace";
import { updateWorkspaceNameSchema } from "~/app/(workspace)/workspace/[id]/settings/general/_validators/update-workspace-name";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { account, workspace as workspaceSchema } from "~/server/db/schema";

export const workspaceRouter = createTRPCRouter({
  create: privateProcedure
    .input(createWorkspaceSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      try {
        const [workspace] = await db
          .insert(workspaceSchema)
          .values({
            name: input.name,
            updated_at: new Date(),
          })
          .returning({ id: workspaceSchema.id })
          .execute();
        console.log(workspace);

        if (!workspace?.id) {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong!",
          });
        }

        await db.insert(account).values({
          updated_at: new Date(),
          workspace_id: workspace.id,
          user_id: user.id,
          type: "CREATOR",
        });
      } catch (error) {
        console.log(error);
      }
      return;
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { db }, input: { id } }) => {
      return await db
        .delete(workspaceSchema)
        .where(eq(workspaceSchema.id, id))
        .returning({ id: workspaceSchema.id })
        .then((res) => res[0]);
    }),

  updateName: privateProcedure
    .input(updateWorkspaceNameSchema)
    .mutation(async ({ ctx: { db }, input: { name, id } }) => {
      console.log(name);
      return await db
        .update(workspaceSchema)
        .set({ name })
        .where(eq(workspaceSchema.id, id))
        .returning({ name: workspaceSchema.name })
        .get();
    }),
});
