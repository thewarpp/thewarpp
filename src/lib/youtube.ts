import { env } from "~/env";

const scopes = [
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/youtube.readonly",
];

export interface Snippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
  };
  localized: { title: string; description: string };
  country: string;
}

export class Youtube {
  static async getTokenResponse(code: string) {
    return await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: env.YOUR_CLIENT_ID,
        client_secret: env.YOUR_CLIENT_SECRET,
        redirect_uri: env.YOUR_REDIRECT_URL,
        grant_type: "authorization_code",
      }),
    });
  }

  static async getAuthorizationUrl(state: string, id: string) {
    // Manually construct the OAuth2 URL
    const queryParams = new URLSearchParams({
      client_id: env.YOUR_CLIENT_ID,
      redirect_uri: env.YOUR_REDIRECT_URL,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      include_granted_scopes: "true",
      state: `${state}-temp_separator-${id}`,
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${queryParams.toString()}`;
  }

  static async refreshAccessToken(refreshToken: string) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: env.YOUR_CLIENT_ID,
        client_secret: env.YOUR_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    return response.json();
  }

  static async getYouTubeChannelSnippet(accessToken: string) {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube channel snippet");
    }

    const data: any = await response.json();
    return data.items[0].snippet as Snippet;
  }
}
