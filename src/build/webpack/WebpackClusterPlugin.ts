import chalk from 'chalk';

import { Plugin, Compiler } from 'webpack';
import { fork, setupMaster, Worker } from 'cluster';

interface WebpackClusterPluginOptions {
    filename: string;
    env?: Record<string, string>;
}

export class WebpackClusterPlugin implements Plugin {
    private worker?: Worker;

    public constructor(private options: WebpackClusterPluginOptions) {}

    private restart(path: string) {
        let prevWorker = this.worker;

        setupMaster({ exec: path });

        this.worker = fork(this.options.env);

        let checkPrev = () => {
            if (prevWorker && !prevWorker.isDead()) {
                prevWorker.kill();
            }
        };

        this.worker.on('listening', () => checkPrev());

        this.worker.on('exit', exitCode => {
            if (exitCode) {
                console.error(chalk.red(`Process ${this.options.filename} stopped with code ${exitCode}`));
            }

            checkPrev();
        });

        this.worker.on('error', error => {
            console.error(chalk.red(`Error in process ${this.options.filename}: ${error}`));
            checkPrev();
        });
    }

    public apply(compiler: Compiler) {
        if (compiler.options.mode === 'production') {
            return;
        }

        compiler.hooks.done.tap('WebpackClusterPlugin', stats => {
            return this.restart(stats.compilation.assets[this.options.filename].existsAt);
        });
    }
}
