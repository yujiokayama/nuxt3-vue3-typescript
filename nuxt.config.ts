import { defineNuxtConfig } from "nuxt";
const { X_API_KEY } = process.env;

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  publicRuntimeConfig: {
    xApiKey: X_API_KEY,
  },
});
