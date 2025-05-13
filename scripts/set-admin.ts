import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  
  try {
    // Get email from command line arguments
    const email = process.argv[2];
    
    if (!email) {
      console.error('Error: Please provide an email address as an argument.');
      console.log('Usage: npx ts-node scripts/set-admin.ts user@example.com');
      process.exit(1);
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      console.error(`Error: No user found with email ${email}`);
      process.exit(1);
    }
    
    // Update user role to ADMIN
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' },
    });
    
    console.log(`User ${updatedUser.name} (${updatedUser.email}) is now an admin.`);
  } catch (error) {
    console.error('Error setting admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
