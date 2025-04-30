import path from "path";
import { rspack } from "@rspack/core";
import { TsCheckerRspackPlugin } from "ts-checker-rspack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const config = {
    entry: {
        main: "./src/index.ts"
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true
    },
    target: ["web", "es2022"],
    devtool: isProduction ? false : "source-map",
    devServer: {
        open: false,
        host: "localhost",
        historyApiFallback: false,
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "same-origin"
        },
        compress: true
    },

    plugins: [
        new TsCheckerRspackPlugin(),
        new rspack.HtmlRspackPlugin({
            title: "Babylon.JS Playwright Example",
            filename: "index.html",
            template: "./index.html",
            chunks: ["main"]
        })
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "builtin:swc-loader",
                exclude: [/node_modules/]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf|png|jpg|gif|webp|glb|obj|mp3|ogg|babylon|env|dds)$/i,
                type: "asset/resource",
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};

export default () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    config.experiments = {
        topLevelAwait: true,
        css: true
    };
    return config;
};
