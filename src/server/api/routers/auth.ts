import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import {
  signInFormSchema,
  signUpFormSchema,
} from "~/app/(auth)/auth/login/_validators";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { user as userSchema } from "~/server/db/schema";
import { createClient } from "~/supabase/server";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpFormSchema)
    .mutation(async ({ ctx, input }) => {
      const { first_name, last_name, email } = input;

      const [user] = await ctx.db
        .select({ id: userSchema.id })
        .from(userSchema)
        .limit(1)
        .where(eq(userSchema.email, email));

      if (user?.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `user with ${input.email} already exists`,
        });
      }

      const host = ctx.headers.get("host")!;
      const supabase = createClient();
      const res = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: { first_name, last_name },
          emailRedirectTo:
            env.NODE_ENV === "production"
              ? `https://${host}/api`
              : `http://${host}/api`,
        },
      });

      if (res.error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: res.error.message,
          cause: res.error.cause,
        });
      }

      return;
    }),

  signIn: publicProcedure
    .input(signInFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db
        .select({ id: userSchema.id })
        .from(userSchema)
        .limit(1)
        .where(eq(userSchema.email, input.email))
        .get();

      if (!user?.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `user with ${input.email} doesn't exists`,
        });
      }

      const host = ctx.headers.get("host")!;
      const supabase = createClient();
      const res = await supabase.auth.signInWithOtp({
        email: input.email,
        options: {
          emailRedirectTo:
            env.NODE_ENV === "production"
              ? `https://${host}/api`
              : `http://${host}/api`,
        },
      });

      if (res.error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: res.error.message,
          cause: res.error.cause,
        });
      }

      return;
    }),
});
