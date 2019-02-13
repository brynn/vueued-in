module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'ttp://localhost:8081',
        ws: true,
        changeOrigin: true,
      },
      '^/auth': {
        target: 'ttp://localhost:8081',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
