import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'lib/index.js',
    output: [
      { name:'json2j', file: 'dist/json2j.cjs.js', format: 'cjs' },
      { name:'json2j', file: 'dist/json2j.es.js', format: 'es' },
    ],
    plugins: createPlugin(),
    onwarn (err) {
      if (err) {
        if (err.code !== 'UNRESOLVED_IMPORT') {
          console.log(err.code, err.message)
        }
      }
    }
  }
]

function createPlugin () {
  return [
    babel({
      babelrc: false,
    }),
    resolve(),
    commonjs({})
  ]  
}
