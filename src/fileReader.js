const fs = require('fs');
const path = require('path');

class FileReader {
  static readContract(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const ext = path.extname(filePath);
      if (ext !== '.sol') {
        throw new Error('Only .sol files are supported');
      }

      const content = fs.readFileSync(filePath, 'utf8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read contract: ${error.message}`);
    }
  }
}

module.exports = FileReader;