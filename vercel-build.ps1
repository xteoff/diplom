Write-Host "🚀 Запуск генерации Prisma Client..."
npx prisma generate

Write-Host "🔨 Сборка Next.js..."
npm run build