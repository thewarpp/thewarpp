import { createTRPCRouter } from "../../trpc";
import { youtubeRouter } from "./youtube";

export const oauthRouter = createTRPCRouter({
  youtube: youtubeRouter,
});
