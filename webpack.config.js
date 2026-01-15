module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svg/webpack"],
      },
    ],
  },
};
