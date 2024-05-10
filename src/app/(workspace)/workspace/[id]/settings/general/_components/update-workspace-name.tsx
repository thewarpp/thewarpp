"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

import type { updateWorkspaceNameSchemaType } from "../_validators/update-workspace-name";
import { updateWorkspaceNameSchema } from "../_validators/update-workspace-name";

export default function UpdateWorkspaceName(props: {
  name: string;
  id: string;
}) {
  // useForm
  const form = useForm<updateWorkspaceNameSchemaType>({
    resolver: zodResolver(updateWorkspaceNameSchema),
    defaultValues: {
      id: props.id,
      name: props.name,
    },
  });

  // state
  const [name, setName] = useState(props.name);

  // mutation
  const { mutate, isPending } = api.workspace.updateName.useMutation({
    onSuccess: (res) => {
      form.setValue("name", res.name);
      setName(res.name);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // handler
  const onSubmit = useCallback(
    (values: updateWorkspaceNameSchemaType) => {
      if (name !== values.name) mutate(values);
    },
    [mutate, name],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Name</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-80">
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button disabled={isPending} className="gap-x-3">
              {isPending ? <Loader className="size-4 animate-spin" /> : null}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
