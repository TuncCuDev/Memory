import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    base: "./",

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                settings: resolve(__dirname, "pages/settings.html"),
                game: resolve(__dirname, "pages/game.html"),
                gameover: resolve(__dirname, "pages/gameover.html"),
            },
        },
    },
});