module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'ttp://localhost:8081',
        ws: true,
        changeOrigin: true,
      },
      '^/foo': {
        target: '<other_url>',
      },
    },
  },
};
