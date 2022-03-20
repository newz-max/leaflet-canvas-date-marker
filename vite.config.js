import { defineConfig } from 'vite'
import {resolve} from 'path'

export default defineConfig({
    build : {
        lib : {
            entry : resolve(__dirname ,'main.js'),
            name : 'leaflet-canvas-date-marker',
            // fileName : (format) => `leaflet-canvas-date-marker.${format}.js`
        }
    },
})