import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#E8F5E9',
          base: '#FFFFFF',
          accent: '#F8BBD0',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

