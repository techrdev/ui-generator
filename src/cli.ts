#!/usr/bin/env node
/* eslint-disable no-void */
import yargs from 'yargs';
import tokensCommand from './commands/tokens';
import getLogo from './lib/logo';

const run = async () => {
  const logo = await getLogo;
  return yargs
    .command(tokensCommand)
    .usage(`${logo}\n\nTool for TECHR UI things.`)
    .help()
    .alias('h', 'help')
    .demandCommand()
    .strict()
    .argv;
};

void run();
