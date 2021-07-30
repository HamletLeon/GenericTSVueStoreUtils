export default {
  context: 'window',
  output: {
    name: 'TSVueStoreUtils',
    file: 'dist/index.umd.js',
    format: 'umd',
    sourcemap: true,
    globals: {
      '@hamletleon/generictypescriptutils': '@hamletleon/generictypescriptutils',
      '@hamletleon/generictsaxiosutils': '@hamletleon/generictsaxiosutils',
      'vue': 'vue',
      'vuex': 'vuex',
      'vuex-typex': 'vuex-typex'
    }
  },
  external: [
    '@hamletleon/generictypescriptutils',
    '@hamletleon/generictsaxiosutils',
    'vue',
    'vuex',
    'vuex-typex'
  ]
}
