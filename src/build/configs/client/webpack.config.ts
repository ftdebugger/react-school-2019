import WebpackManifestPlugin from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { DefinePlugin } from 'webpack';
import { resolve } from 'path';
import { LAZY_COMPONENT_PLUGIN } from 'build/babel/lazyComponentBabelPlugin';
import merge from 'webpack-merge';
import defaultConfig from 'build/configs/common.webpack.config';

const PUBLIC_PATH = '/assets/';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default merge(defaultConfig, {
    name: 'client',
    entry: resolve('src/client/index.ts'),

    output: {
        path: resolve('dist/client/assets'),
        filename: IS_PRODUCTION ? '[contenthash:8].js' : '[name].js',
        chunkFilename: IS_PRODUCTION ? '_[contenthash:8].js' : '_[name].js',
        publicPath: PUBLIC_PATH,
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.tsx?$/,
                        include: [resolve('src')],
                        use: [
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: resolve('node_modules/.cache/babel-client'),
                                },
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    babelrc: false,

                                    presets: [
                                        [
                                            '@babel/preset-env',
                                            {
                                                modules: false,
                                                loose: true,
                                                useBuiltIns: 'usage',
                                                corejs: 3,
                                            },
                                        ],
                                        ['@babel/preset-react', {}],
                                        ['@babel/preset-typescript', {}],
                                    ],
                                    plugins: [
                                        LAZY_COMPONENT_PLUGIN,
                                        '@babel/plugin-proposal-class-properties',
                                        '@babel/plugin-transform-runtime',
                                        'babel-plugin-optimize-react',
                                    ],
                                },
                            },
                        ],
                    },

                    {
                        test: /\.scss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'cache-loader',
                                options: {
                                    cacheDirectory: resolve('node_modules/.cache/babel-client'),
                                },
                            },
                            'css-loader',
                            'sass-loader',
                        ],
                    },
                ],
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: IS_PRODUCTION ? '[contenthash:8].css' : '[name].css',
            chunkFilename: IS_PRODUCTION ? '_[contenthash:8].css' : '_[name].css',
        }),

        new WebpackManifestPlugin({
            fileName: '../../asset-manifest.json',
            publicPath: PUBLIC_PATH,
            generate(seed, files) {
                let manifestFiles = files.reduce(function(manifest, file) {
                    if (file.name) {
                        // @ts-ignore
                        manifest[file.name] = file.path;
                    }

                    return manifest;
                }, seed);

                return {
                    files: manifestFiles,
                };
            },
        }),

        new DefinePlugin({
            'typeof window': '"object"',
        }),

        ...(IS_PRODUCTION ? [new OptimizeCssAssetsPlugin()] : []),
    ],
});
