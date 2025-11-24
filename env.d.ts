/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // Server-side environment variables
    TMDB_API_TOKEN?: string;

    // Add your NEXT_PUBLIC_ environment variables here for TypeScript support
    // Example:
    // NEXT_PUBLIC_API_URL?: string;
    // NEXT_PUBLIC_APP_NAME?: string;
    // NEXT_PUBLIC_APP_URL?: string;
  }
}