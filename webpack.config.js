const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require("fs");

// Read the version from package.json
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const oramaVersion = packageJson.dependencies["@orama/orama"] || "unknown version";

module.exports = {
  entry: "./src/index.js", // Your main JavaScript file
  mode: "production",
  output: {
    filename: "search-orama.js",
    path: path.resolve(__dirname, "dist"), // Output directory
    library: {
      name: ["relearn", "search", "adapter"], // The name of the global variable
      type: "window", // Expose the library on the window object
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // Disable license file extraction
      }),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `/*!\n * Hugo Relearn theme search adapter, bundling Orama ${oramaVersion}\n * https://github.com/McShelby/hugo-theme-relearn-orama\n * MIT license\n */`,
      raw: true,
    }),
  ],
};
