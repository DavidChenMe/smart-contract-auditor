#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const FileReader = require('./fileReader');
const VulnerabilityDetector = require('./vulnerabilityDetector');
const ReportGenerator = require('./reportGenerator');

console.log(chalk.blue('Smart Contract Auditor v0.1.0'));

program
  .name('smart-contract-auditor')
  .description('A tool for auditing Solidity smart contracts')
  .version('0.1.0');

program
  .command('audit')
  .description('Audit a smart contract file')
  .argument('<file>', 'path to smart contract file')
  .option('--output <file>', 'save report to file (supports .json and .md)')
  .action((file, options) => {
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

      if (options.output) {
        const ext = path.extname(options.output);
        let reportPath;
        
        if (ext === '.json') {
          reportPath = ReportGenerator.generateJSON(results, options.output);
        } else if (ext === '.md') {
          reportPath = ReportGenerator.generateMarkdown(results, options.output);
        } else {
          console.warn(chalk.yellow('Unsupported output format. Use .json or .md'));
          return;
        }
        
        console.log(chalk.green(`\n📄 Report saved to: ${reportPath}`));
      }
      
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();