import { defineConfig } from "vite";

// add(+) all files inside src => as one file

export default defineConfig({
    publicDir: "../public",
    root: './src',
    build:{
        outDir: "../dist", //define the output directory , the output directory for to build file
        rollupOptions: {
            input: {
                main: "./src/index.html",
                profile: "./src/profile.html",
                reset: "./src/reset.html",
                signin: "./src/signin.html",
                signup: "./src/signup.html"
            }
        }
    },
    server:{
        watch: {
            usePolling: true
        }
    }
});