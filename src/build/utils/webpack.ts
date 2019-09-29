import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import defaultConfig from 'build/configs/common.webpack.config';

export function createWebpackConfig(config: Configuration): Configuration {
    return merge(defaultConfig, config);
}
