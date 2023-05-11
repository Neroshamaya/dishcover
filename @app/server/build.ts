import esbuild from 'esbuild'
import glob from 'tiny-glob'
const build = async () =>
  await esbuild.build({
    entryPoints: await glob('./src/**/*.ts'),
    platform: 'node',
    outdir: 'build',
    outbase: 'src',
    sourcemap: 'both',
    target: 'ES2020',
    format: 'cjs',
    
  })
build()
