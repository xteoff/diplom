# vercel-build.sh
#!/bin/bash
echo "→ Генерация Prisma Client..."
npx prisma generate

echo "→ Сборка Next.js..."
npm run build