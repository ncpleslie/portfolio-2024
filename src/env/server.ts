import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import fileEnv from "./fileEnv";

const isServer = typeof window === "undefined";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    RESEND_DOMAIN: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    EMAIL_TO: z.string().min(1),
  },
  runtimeEnv: {
    ...fileEnv,
    ...import.meta.env,
    ...(isServer ? process.env : {}),
  },
});
