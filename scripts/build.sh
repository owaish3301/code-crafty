#!/bin/bash

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run Next.js build
echo "Building Next.js application..."
next build
