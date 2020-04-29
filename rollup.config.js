import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import { terser } from 'rollup-plugin-terser';
import typescript2 from 'rollup-plugin-typescript2';

const tersetOptions = {
  module: true,
  compress: {
    unsafe: true
  },
  mangle: true
};

const constToLet = () => ({
  name: 'const-to-let',
  renderChunk: content => content.replace(/const /g, 'let ')
});

const types = (input, outDir) => ({
  input,
  plugins: [
    del({
      targets: [
        outDir + '/index.js',
        outDir + '/index.min.js',
        outDir + '/index.d.ts',
        outDir + '/cjs/*',
        outDir + '/umd/*'
      ]
    }),
    typescript2({
      tsconfig: 'config/tsconfig.types.json',
      tsconfigOverride: {
        include: [
          '../' + outDir + '/index.ts'
        ]
      }
    }),
    del({
      targets: [outDir + '/index.ts'],
      hook: 'buildEnd'
    })
  ],
  onwarn: () => null,
  output: {
    file: outDir + '/index.d.ts'
  }
});

const bundle = (input, outDir) => ({
  input,
  plugins: [typescript()],
  output: [
    {
      file: outDir + '/index.js',
      format: 'esm'
    },
    {
      file: outDir + '/cjs/index.js',
      format: 'cjs'
    },
    {
      file: outDir + '/umd/index.js',
      name: 'uvo',
      format: 'umd'
    },
    {
      file: outDir + '/index.min.js',
      plugins: [terser(tersetOptions), constToLet()],
    },
    {
      file: outDir + '/cjs/index.min.js',
      format: 'cjs',
      plugins: [terser(tersetOptions), constToLet()],
    },
    {
      file: outDir + '/umd/index.min.js',
      name: 'uvo',
      format: 'umd',
      plugins: [terser(tersetOptions), constToLet()],
    }
  ]
});

export default [
  types('dist/index.ts', 'dist'),
  types('template/index.ts', 'template'),
  types('extended/index.ts', 'extended'),
  types('extended-template/index.ts', 'extended-template'),
  bundle('src/base-api/index.ts', 'dist'),
  bundle('src/templating-api/template.ts', 'template'),
  bundle('src/base-api/extensions/index.ts', 'extended'),
  bundle('src/templating-api/extensions/index.ts', 'extended-template')
];