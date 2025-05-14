// Cross-platform script to generate Prisma client
const { execSync } = require('child_process');

console.log('Generating Prisma client...');
try {
  // Pipe "10" to the prisma generate command to automatically rate it
  const stdin = Buffer.from('10\n');
  execSync('npx prisma generate', { input: stdin, stdio: ['pipe', 'inherit', 'inherit'] });
  console.log('Prisma client generated successfully.');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}
