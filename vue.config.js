module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'http://production-path/'
      : 'http://localhost:8080',
  devServer: {
    proxy: 'http://localhost:8081',
  },
};
