echo "\n[i] Pushing the Prisma Schema\n"
npx prisma db push

echo "\n[i] Starting Application"
npm run start:prod