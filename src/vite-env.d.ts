/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_LRT_OR_RTL: "rtl" | "ltr";
  readonly VITE_APP_NAME: string;
  readonly VITE_BASE_API: any;
  readonly VITE_PRODUCTION_BASE_API: any;
  readonly VITE_PRODUCTION_DOMAIN: any;
  readonly VITE_DEVELOPMENT_DOMAIN: any;
  // more env variables...
} 

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
