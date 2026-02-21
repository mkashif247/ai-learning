import { betterAuth } from "better-auth";

import { env } from "@/lib/env";
// We don't have a specific mongoose adapter natively for better auth out of the box in the simplest core, so we will use the credential pattern primarily first or map it to the DB if needed.

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL || "http://localhost:3000",
  // TODO: we map the db wrapper here

  // Conditional Auth Providers
  socialProviders: {
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },

  // Fallback to strict email/password credentials matching the legacy NextAuth config
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    // Custom database integration can be expanded here
  },
});
