#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const FileReader = require('./fileReader');
const VulnerabilityDetector = require('./vulnerabilityDetector');

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
    try {
      console.log(chalk.green(`Auditing contract: ${file}`));
      
      const contractCode = FileReader.readContract(file);
      const detector = new VulnerabilityDetector();
      const results = detector.analyze(contractCode, file);
      
      console.log(chalk.blue(`\n=== Audit Results for ${results.filename} ===`));
      console.log(chalk.yellow(`Risk Level: ${results.riskLevel}`));
      console.log(chalk.gray(`Found ${results.vulnerabilities.length} potential issues\n`));
      
      if (results.vulnerabilities.length === 0) {
        console.log(chalk.green('✓ No vulnerabilities detected'));
      } else {
        results.vulnerabilities.forEach((vuln, index) => {
          const severityColor = vuln.severity === 'HIGH' ? 'red' : 'yellow';
          console.log(chalk[severityColor](`${index + 1}. ${vuln.type} (Line ${vuln.line})`));
          console.log(chalk.gray(`   ${vuln.description}`));
          console.log(chalk.cyan(`   Recommendation: ${vuln.recommendation}\n`));
        });
      }
      
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();