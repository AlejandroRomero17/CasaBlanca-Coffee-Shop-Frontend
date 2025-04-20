/// <reference types="vite/client" />
/// <reference types="vite-plugin-image-optimizer/client" />

// Tipos para importaciones de imágenes
declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

// Tipos para Vite
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // otras variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
