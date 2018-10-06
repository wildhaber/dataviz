const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {

    const isProd = (argv.mode === 'production');

    return {
        entry: {
            DataViz: './src/DataViz.js',
            DataVizStyles: './src/DataVizStyles.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],
        devtool: (isProd) ? false : 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                        },
                        {
                            loader: 'sass-loader', // compiles Sass to CSS
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        'file-loader',
                    ],
                },
                {
                    test: /\.(csv|tsv)$/,
                    use: [
                        'csv-loader',
                    ],
                },
                {
                    test: /\.xml$/,
                    use: [
                        'xml-loader',
                    ],
                },
            ],
        },
    };
};
