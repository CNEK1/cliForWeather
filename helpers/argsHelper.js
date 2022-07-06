import yargs from 'yargs';
import chalk from 'chalk';

const findArgs = () => {
    const y = yargs();
    y.version('1.0.0');

    // --- ADD OPTIONS ----
    return y
        .help('h')
        .alias('h', 'help')
        .epilog('copyright 2022')
        .example(chalk.bgCyan('$0 -s', '<weather in search town>'))
        .options('s', {
            alias: 'search',
            required: false,
            describe: 'Weather in search town',
            type: 'string',
            nargs: 1
        })
        .options('t', {
            alias: 'token',
            required: false,
            describe: 'Saving API token',
            type: 'string',
            nargs: 1
        })
        .options('d', {
            alias: 'daily',
            required: false,
            describe: 'Forecast for 5 days with data every 3 hours',
            type: 'string',
            nargs: 1
        });
};

export { findArgs };
