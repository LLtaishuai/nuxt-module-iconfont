// esbuild.config.js
import esbuild from "esbuild"

esbuild.build({
  entryPoints: ['src/index.js'], // 入口文件
  bundle: true, // 启用打包
  external: ['fs', 'path'], // 排除 Node.js 内置模块
  platform: 'node',
  target: 'node14', // 目标为 Node.js 14
  outdir: 'dist', // 输出目录
  format: 'cjs', // 输出格式：CommonJS
  outdir: 'dist/cjs', // 输出目录为 ESM 格式
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  external: ['fs', 'path'],
  platform: 'node',
  target: 'node14',
  outdir: 'dist', // 输出目录
  format: 'esm', // 输出格式：ES Module
  outdir: 'dist/esm', // 输出目录为 ESM 格式
}).catch(() => process.exit(1));
