/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

await import("./src/env.js");

if (process.env.NODE_ENV === "development") {
  setupDevPlatform();
}

/** @type {import("next").NextConfig} */
const config = {
  // typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    );

    config.externals.push({
      "node:crypto": "commonjs crypto",
    });

    return config;
  },
  experimental: {
    reactCompiler: true
  }
};

export default config;
