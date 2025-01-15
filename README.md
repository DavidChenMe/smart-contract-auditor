# Smart Contract Auditor

A command-line tool for auditing Solidity smart contracts and detecting common security vulnerabilities.

## Features

- Static analysis of Solidity contracts
- Detection of common vulnerabilities:
  - **Reentrancy attacks** - Detects external calls followed by state changes
  - **Access control issues** - Identifies public functions without proper restrictions
  - **Integer overflow/underflow** - Flags arithmetic operations without SafeMath
- Colored output with severity levels (HIGH, MEDIUM, LOW)
- Detailed recommendations for fixing vulnerabilities
- Line-by-line vulnerability reporting

## Installation

```bash
npm install
```

## Usage

### Basic Audit

Audit a single Solidity contract:

```bash
node src/index.js audit path/to/contract.sol
```

### Example Output

```
Smart Contract Auditor v0.1.0
Auditing contract: examples/vulnerable.sol

=== Audit Results for examples/vulnerable.sol ===
Risk Level: HIGH
Found 2 potential issues

1. REENTRANCY_RISK (Line 12)
   External call followed by state change - potential reentrancy vulnerability
   Recommendation: Use checks-effects-interactions pattern or reentrancy guard

2. ACCESS_CONTROL (Line 10)
   Public function without access control detected
   Recommendation: Add appropriate access control modifiers
```

## Example Contracts

The `examples/` directory contains sample contracts for testing:

- `vulnerable.sol` - Contract with multiple security vulnerabilities

## Contributing

This is a personal project for learning smart contract security analysis.

## License

MIT