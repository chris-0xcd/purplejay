import {join, resolve} from 'path'
import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import VuetifyPlugin from 'vite-plugin-vuetify'
import {buildSync} from "esbuild";
import {nodePolyfills} from "vite-plugin-node-polyfills";
import nodePolyfillsRollup from "rollup-plugin-polyfill-node";

process.env.ELECTRON_ENTRY = resolve('out/main/index.cjs');

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin({exclude: ['got']})],
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: '[name].cjs'
                }
            }
        }
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: '[name].cjs'
                }
            }
        }
    },
    renderer: {

        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        worker: {
            format: 'es'
        },
        build: {
            rollupOptions: {
              // plugins: [nodePolyfillsRollup()],
            }
        },
        plugins: [
            //externalizeDepsPlugin({exclude: ['jsdom']}),
            vue(),
            VuetifyPlugin({
                autoImport: true
            }),
            nodePolyfills({
              globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
              },
            }),
            {
                apply: "build",
                enforce: "post",
                transformIndexHtml() {
                    buildSync({
                        minify: true,
                        bundle: true,
                        entryPoints: [join(process.cwd(), "src/renderer/ServiceWorker.js")],
                        outfile: join(process.cwd(), "out/renderer", "ServiceWorker.js"),
                    });
                },
            },
        ]
    }
})
