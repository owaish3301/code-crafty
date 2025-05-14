#!/bin/sh

# Log the current directory and Node.js version
echo "Current directory: $(pwd)"
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies if necessary (Vercel should handle this already)
# npm install

# Generate Prisma Client
echo "Generating Prisma client..."
npx prisma generate

# Run the Next.js build
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"
