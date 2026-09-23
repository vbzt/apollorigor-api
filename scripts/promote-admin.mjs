import 'dotenv/config';
import { PrismaClient } from '../dist/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
const authUserId = process.argv[2];
if (
  !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    authUserId ?? '',
  )
) {
  console.error(
    'Uso: npm run admin:promote -- <UUID do usuário Supabase que já fez login>',
  );
  process.exit(1);
}
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DIRECT_URL }),
});
try {
  await db.profile.update({ where: { authUserId }, data: { role: 'ADMIN' } });
  console.log('Perfil promovido a administrador.');
} catch {
  console.error(
    'Não foi possível promover. Confira a conexão e se o perfil já existe.',
  );
  process.exitCode = 1;
} finally {
  await db.$disconnect();
}
