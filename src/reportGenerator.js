const fs = require('fs');
const path = require('path');

class ReportGenerator {
  static generateJSON(auditResults, outputPath) {
    const report = {
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      contract: auditResults.filename,
      riskLevel: auditResults.riskLevel,
      summary: {
        totalVulnerabilities: auditResults.vulnerabilities.length,
        high: auditResults.vulnerabilities.filter(v => v.severity === 'HIGH').length,
        medium: auditResults.vulnerabilities.filter(v => v.severity === 'MEDIUM').length,
        low: auditResults.vulnerabilities.filter(v => v.severity === 'LOW').length
      },
      vulnerabilities: auditResults.vulnerabilities
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    return outputPath;
  }

  static generateMarkdown(auditResults, outputPath) {
    let content = `# Security Audit Report\n\n`;
    content += `**Contract:** ${auditResults.filename}\n`;
    content += `**Risk Level:** ${auditResults.riskLevel}\n`;
    content += `**Date:** ${new Date().toLocaleDateString()}\n\n`;

    content += `## Summary\n\n`;
    const summary = {
      total: auditResults.vulnerabilities.length,
      high: auditResults.vulnerabilities.filter(v => v.severity === 'HIGH').length,
      medium: auditResults.vulnerabilities.filter(v => v.severity === 'MEDIUM').length,
      low: auditResults.vulnerabilities.filter(v => v.severity === 'LOW').length
    };

    content += `- **Total Issues:** ${summary.total}\n`;
    content += `- **High Severity:** ${summary.high}\n`;
    content += `- **Medium Severity:** ${summary.medium}\n`;
    content += `- **Low Severity:** ${summary.low}\n\n`;

    if (auditResults.vulnerabilities.length > 0) {
      content += `## Vulnerabilities\n\n`;
      
      auditResults.vulnerabilities.forEach((vuln, index) => {
        content += `### ${index + 1}. ${vuln.type} (Line ${vuln.line})\n\n`;
        content += `**Severity:** ${vuln.severity}\n\n`;
        content += `**Description:** ${vuln.description}\n\n`;
        content += `**Recommendation:** ${vuln.recommendation}\n\n`;
        content += `---\n\n`;
      });
    } else {
      content += `## Results\n\n✅ No vulnerabilities detected.\n\n`;
    }

    fs.writeFileSync(outputPath, content);
    return outputPath;
  }
}

module.exports = ReportGenerator;