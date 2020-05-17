import typescript from '@rollup/plugin-typescript';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
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

const module = outDir => ({
  name: 'module',
  buildEnd: () => {
    writeFileSync(resolve(outDir + '/package.json'), JSON.stringify(
      {
        main: './index.js',
        module: './esm/index.js',
        unpkg: './esm/index.min.js',
        typings: './index.d.ts'
      }
    ));

    writeFileSync(resolve(outDir + '/index.js'), (
      `
      module.exports = (
        process.env.NODE_ENV === 'production'
          ? require('./cjs/index.min.js')
          : require('./cjs/index.js')
      )
      `.replace(/[ \n\r]+/g, '')
    ));
  }
});

const typesLink = (outDir, typesDir) => ({
  name: 'typesLink',
  buildEnd: () => {
    writeFileSync(resolve(outDir + '/package.json'), JSON.stringify(
      {
        typings: typesDir + '/index.d.ts'
      }
    ));
  }
});

const types = (input, outDir) => ({
  input,
  plugins: [
    del({
      targets: [
        outDir + '/index.js',
        outDir + '/package.json',
        outDir + '/index.d.ts',
        outDir + '/esm/*',
        outDir + '/cjs/*',
        outDir + '/es5/*',
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

const bundle = (input, outDir, createModule) => ({
  input,
  plugins: [typescript(), createModule ? module(outDir) : null],
  output: [
    {
      file: outDir + '/esm/index.js',
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
      file: outDir + '/esm/index.min.js',
      format: 'esm',
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

const es5Bundle = (input, outDir = '.') => ({
  input,
  plugins: [
    typescript2({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        }
      }
    })
  ],
  output: [
    {
      file: outDir + '/es5/index.js',
      format: 'esm'
    },
    {
      file: outDir + '/es5/index.min.js',
      format: 'esm',
      plugins: [terser(tersetOptions)],
    },
  ]
});

const copyTypes = (input, inDir, outDir = '.') => ({
  input: input,
  plugins: [typesLink(outDir + '/es5', inDir)],
  output: {
    file: input
  }
});

export default [
  types('dist/index.ts', 'dist'),
  types('template/index.ts', 'template'),
  types('extended/index.ts', 'extended'),
  types('extended-template/index.ts', 'extended-template'),

  bundle('src/base-api/index.ts', 'dist'),
  bundle('src/templating-api/template.ts', 'template', true),
  bundle('src/base-api/extensions/index.ts', 'extended', true),
  bundle('src/templating-api/extensions/index.ts', 'extended-template', true),

  es5Bundle('src/base-api/index.ts'),
  es5Bundle('src/templating-api/template.ts', 'template'),
  es5Bundle('src/base-api/extensions/index.ts', 'extended'),
  es5Bundle('src/templating-api/extensions/index.ts', 'extended-template'),

  copyTypes('es5/index.js', '../dist'),
  copyTypes('template/es5/index.js', '..', 'template'),
  copyTypes('extended/es5/index.js', '..', 'extended'),
  copyTypes('extended-template/es5/index.js', '..', 'extended-template'),
];