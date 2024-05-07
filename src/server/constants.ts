import { google } from "googleapis";

import { env } from "~/env";

// cookies
export const youtubeOauthCookiesKey = "YOUTUBE_OAUTH_COOKIES_STATE_KEY";

// oauth google client
export const oauth2Client = new google.auth.OAuth2(
  env.YOUR_CLIENT_ID,
  env.YOUR_CLIENT_SECRET,
  env.YOUR_REDIRECT_URL,
);
