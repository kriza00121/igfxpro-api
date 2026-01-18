#!/bin/bash
set -e

# Set the DATABASE_URL for connections within the container
export DATABASE_URL="postgresql://igfxpro:igfxpro_secret@localhost/igfxpro_db?schema=public"

# Run Prisma migration
npx prisma migrate dev --name init
