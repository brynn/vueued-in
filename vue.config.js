module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
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
