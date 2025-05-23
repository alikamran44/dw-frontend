/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_LRT_OR_RTL: "rtl" | "ltr";
  readonly VITE_APP_NAME: string;
  // more env variables...
} 

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
