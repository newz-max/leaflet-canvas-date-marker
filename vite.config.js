import { defineConfig } from 'vite'
import { terser } from 'rollup-plugin-terser'
import {resolve} from 'path'

export default defineConfig({
    build : {
        lib : {
            entry : resolve(__dirname ,'main.js'),
            name : 'leaflet-canvas-date-marker',
            // fileName : (format) => `leaflet-canvas-date-marker.${format}.js`
        },
        terserOptions : {
            compress : false,
            toplevel : true,
            keep_classnames : false,
            keep_fnames : false,

        }
    },
    plugins : [terser()]
})