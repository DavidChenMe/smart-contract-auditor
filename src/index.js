#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

console.log(chalk.blue('Smart Contract Auditor v0.1.0'));

program
  .name('smart-contract-auditor')
  .description('A tool for auditing Solidity smart contracts')
  .version('0.1.0');

program
  .command('audit')
  .description('Audit a smart contract file')
  .argument('<file>', 'path to smart contract file')
  .action((file) => {
    console.log(chalk.green(`Auditing contract: ${file}`));
    console.log(chalk.yellow('Feature coming soon...'));
  });

program.parse();