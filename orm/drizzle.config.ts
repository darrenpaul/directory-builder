export default {
  dialect: 'postgresql',
  schema: './schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.SUPABASE_DATABASE_CONNECTION_STRING!,
  },
};
