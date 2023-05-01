
import * as esbuild from 'esbuild'
import glob from 'tiny-glob'

(async () => await esbuild.build({
    entryPoints: await glob('./src/**/*.ts'),
    platform: 'node',
    outdir: 'build',
    outbase:'src',
    sourcemap: 'both',
    target: 'es2019',
    format: 'cjs'
}))()

