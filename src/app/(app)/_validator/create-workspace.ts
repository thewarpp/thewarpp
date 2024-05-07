import type z from "zod";
import { object, string } from "zod";

const createWorkspaceSchema = object({
  name: string().min(3),
});

type createWorkspaceSchemaType = z.infer<typeof createWorkspaceSchema>;

export { createWorkspaceSchema, type createWorkspaceSchemaType };
