/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-canvas': '#FDFBF7',
        'surface-subtle': '#F7F4EC',
        'surface-muted': '#EFE9DB',
        'border-subtle': '#ECE6D8',
        'border-stone': '#E2D9CB',
        'border-strong': '#C5BCAB',
        'primary': '#334436',
        'primary-container': '#4A5B4C',
        'primary-light': '#EAF0EA',
        'primary-deep': '#243227',
        'on-primary': '#FFFFFF',
        'secondary': '#885039',
        'secondary-dark': '#70412E',
        'syariah-gold': '#C89D4B',
        'gold-soft': '#E2C382',
        'gold-subtle': '#F7EED9',
        'on-surface': '#1A1918',
        'on-surface-variant': '#494C48',
        'warm-sage': '#3E4F40'
      },
      fontFamily: {
        serif: ["'Source Serif 4'", 'Georgia', 'serif'],
        sans: ["'Plus Jakarta Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      boxShadow: {
        'ambient': '0 20px 40px -15px rgba(26, 25, 24, 0.05)',
        'ambient-lg': '0 30px 60px -20px rgba(40, 54, 43, 0.08)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6)',
        'gold-glow': '0 10px 25px -5px rgba(200, 157, 75, 0.3)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'magnetic': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    }
  },
  plugins: [],
};
