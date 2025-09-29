import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
    content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
    theme: { extend: {} },
    plugins: [typography, lineClamp],
};
export default config;
