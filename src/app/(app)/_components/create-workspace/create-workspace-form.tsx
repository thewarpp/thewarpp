import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

import type { createWorkspaceSchemaType } from "../../_validator/create-workspace";
import { createWorkspaceSchema } from "../../_validator/create-workspace";

export const CreateWorkspaceForm = ({ className }: { className?: string }) => {
  // useForm
  const form = useForm<createWorkspaceSchemaType>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  // useRouter
  const router = useRouter();

  // useMutation
  const { mutate: create, isPending } = api.workspace.create.useMutation({
    onSuccess: () => router.refresh(),
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // form actions
  const onSubmit = useCallback(
    async (values: createWorkspaceSchemaType) => {
      create(values);
    },
    [create],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid">
                <FormLabel>Workspace Name</FormLabel>
                <FormControl>
                  <Input placeholder="abc..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full gap-x-2">
            {isPending ? <Loader className="size-4 animate-spin" /> : null}
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};
