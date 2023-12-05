/* eslint-disable */
import {build} from 'esbuild';
import { glob } from 'glob';
import fs from 'fs-extra';

const entryPoints = glob.sync('./src/**/*.{js,ts,tsx}');
const isProduction = process.env.NODE_ENV === 'production';

build({
    entryPoints: entryPoints,
    bundle: true,
    sourcemap: (!isProduction),
    outdir: 'dist',
    target: 'es2020',
    logLevel: 'info',
    minify: (!!isProduction),
}).then(() => {
    // fs.emptyDir('./dist');  // ここでemptyDirを使う
    fs.copy('./manifest.json', './dist/manifest.json')
    fs.copy('./src/popup/popup.html', './dist/popup/popup.html');
    fs.copy('./src/icons', './dist/icons');
}).catch(() => process.exit(1))