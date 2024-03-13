import type { DefaultUser } from "next-auth";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SANITY_PROJECT_ID: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      prisma: PrismaClient;
      stripeCustomerId: string;
      PRODUCTION_ROUTE: string;
      ENV: string;
      DEV_ROUTE: string;
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    }
  }
}