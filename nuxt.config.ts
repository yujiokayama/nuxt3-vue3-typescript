import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  publicRuntimeConfig: {
    X_API_KEY: process.env.X_API_KEY,
  },
});
