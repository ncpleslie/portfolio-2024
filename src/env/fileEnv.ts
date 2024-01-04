// fileEnv.ts
// (Server-side only) This file contains an exported object that will be
// assigned the content of the .env files (if any) by the astro.config.mjs file.
//
// The purpose is to use variables in the .env file in the
// ./src/env-validate.ts file without that file having to use Vite's `loadEnv`
// function, causing the `fsevents` module to be bundled in the client-side
// bundle.
const fileEnv: Record<string, string> = {};

export default fileEnv;
