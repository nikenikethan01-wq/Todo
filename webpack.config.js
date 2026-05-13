import path from "node:path"
import HtmlWebpackPlugin from "html-webpack-plugin"

export default {
    mode: "development",
    entry: "./src/scripts.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true
    },
    //html plugin
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    //Loading css
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    //webpack dev server
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ["./src/index.html"]
    }
}