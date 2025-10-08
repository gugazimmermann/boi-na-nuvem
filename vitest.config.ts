import { defineConfig, mergeConfig } from 'vitest/config'
import { defineConfig as defineViteConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const viteConfig = defineViteConfig({
    plugins: [tailwindcss(), tsconfigPaths()],
})

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            setupFiles: ['./test-setup.ts'],
            globals: true,
        },
    })
)
