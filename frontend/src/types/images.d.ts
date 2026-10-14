// src/images.d.ts
declare module "*.svg" {
  const src: string;
  export default src;
}

// In your images.d.ts file:
declare module "*.JPEG" {
  const image: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
  export default image;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}