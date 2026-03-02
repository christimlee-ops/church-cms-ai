// Plesk/Passenger startup file for Next.js standalone
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

// If standalone build doesn't exist, run the build
if (!fs.existsSync(standaloneServer)) {
  console.log('No build found. Running deploy script...');
  try {
    execSync('bash deploy.sh', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.error('Deploy script failed:', err.message);
    process.exit(1);
  }
}

process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';
require(standaloneServer);
