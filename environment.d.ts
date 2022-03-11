declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WEBSITE_NAME: string;
      NEXT_PUBLIC_MAILSAC_CUSTOM_DOMAIN: string;

      MAILSAC_KEY: string;
    }
  }
}
