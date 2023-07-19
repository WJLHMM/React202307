const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

const path = require("path");
// process.env.NODE_ENV == "development" ? "development" : "production";
module.exports = {
  //   mode: process.env.NODE_ENV == "development" ? "development" : "production",
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    // hot: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: {
      //browserHistory模式，刷新会报404 自动重新定向到index.html
      index: "./index.html",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "ts-loader",
        // options: {
        //   transpileOnly: true,
        //   getCustomTransformers: () => ({
        //     before: [
        //       tsImportPluginFactory({
        //         libraryName: "antd", //antd  官方说明具有按需加载的工作，所以其他第三方组件需要的话可以在这里配置
        //         libraryDirectory: "es",
        //         // 这句必须加上，不然修改主题没有效果
        //         // style: (name) => `${name}/style/less`,
        //         style: true,
        //       }),
        //     ],
        //   }),
        //   compilerOptions: {
        //     module: "es2015",
        //   },
        // },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.(j|t)sx?$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         [
          //           "postcss-preset-env",
          //           ["autoprefixer", {}],
          //           // {
          //           // 其他选项
          //           // },
          //         ],
          //       ],
          //     },
          //   },
          // },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 50, // rem 相对于 px 的单位， 1rem = 100 px
              remPrecision: 8, // rem 小数点后面的位数
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         [
          //           "postcss-preset-env",
          //           ["autoprefixer", {}],
          //           // {
          //           // 其他选项
          //           // },
          //         ],
          //       ],
          //     },
          //   },
          // },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 50, // rem 相对于 px 的单位， 1rem = remUnit px
              remPrecision: 8, // rem 小数点后面的位数
            },
          },
          {
            loader: "less-loader",
            //这里原本解决注释/*no*/失效 ，继续转化的问题，现在看不行。直接px 改为PX生效
            options: {
              lessOptions: {
                outputStyle: "expanded",
                compress: false,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "px2rem-loader",
            options: {
              remUnit: 50, // rem 相对于 px 的单位， 1rem = remUnit px
              remPrecision: 8, // rem 小数点后面的位数
            },
          },
          {
            loader: "sass-loader",
            //这里原本解决注释/*no*/失效 ，继续转化的问题，现在看不行。直接px 改为PX生效
            options: {
              sassOptions: {
                outputStyle: "expanded",
                // compress: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: ["url-loader"],
      },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: "url-loader" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
