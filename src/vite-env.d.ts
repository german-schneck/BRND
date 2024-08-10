/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_HOST: string;
  readonly VITE_APP_FRAME_URL: string;
  readonly VITE_APP_HOW_IT_WORKS: string;
}