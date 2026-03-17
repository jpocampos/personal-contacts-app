const path = require("path")

module.exports = {
    entry: "./frontend/main.js",
    mode: "production",
    watchOptions: {
        ignored: /node_modules/,
    },
    output: {
        path: path.resolve(__dirname, "public", "assets", "js"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
            test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        targets: "defaults",
                        presets: [
                            ['@babel/preset-env']
                        ]
                    }
                }
            }
        ],
    },
    devtool: "source-map"
};