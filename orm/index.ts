import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error('DATABASE_URL is required');

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function migrateDb() {
  await migrate(db, { migrationsFolder: './migrations' });

  await sql.end();
}
migrateDb();
