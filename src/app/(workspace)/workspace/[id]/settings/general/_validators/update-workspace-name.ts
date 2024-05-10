import type z from "zod";
import { object, string } from "zod";

const updateWorkspaceNameSchema = object({
  id: string(),
  name: string().min(3),
});

type updateWorkspaceNameSchemaType = z.infer<typeof updateWorkspaceNameSchema>;

export { updateWorkspaceNameSchema, type updateWorkspaceNameSchemaType };
