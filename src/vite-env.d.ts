/// <reference types="vite/client" />

declare module "*?*" {
  const src: string;
  export default src;
}
declare module "*.webp?w=*&as=srcset" {
  const srcset: string;
  export default srcset;
}
declare module "*.webp?width=*&format=*" {
  const src: string;
  export default src;
}
