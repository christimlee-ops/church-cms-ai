// Plesk/Passenger startup file for Next.js standalone
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

// Check if rebuild is needed: no build exists, or source is newer than build
function needsRebuild() {
  if (!fs.existsSync(standaloneServer)) return true;
  try {
    const buildTime = fs.statSync(standaloneServer).mtimeMs;
    const srcFiles = ['package.json', 'next.config.mjs', 'deploy.sh'];
    return srcFiles.some(f => {
      const full = path.join(__dirname, f);
      return fs.existsSync(full) && fs.statSync(full).mtimeMs > buildTime;
    });
  } catch { return true; }
}

if (needsRebuild()) {
  console.log('Build missing or outdated. Running deploy script...');
  try {
    execSync('bash deploy.sh', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.error('Deploy script failed:', err.message);
    process.exit(1);
  }
}

process.env.HOSTNAME = '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';

// Change working directory to standalone so server.js can find .next/static/ and public/
process.chdir(path.join(__dirname, '.next', 'standalone'));
require(standaloneServer);
