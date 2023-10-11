import Pool from "pg-pool";

export const pool = new Pool({
  // eslint-disable-next-line no-undef
  database: process.env.DATABASE,
  // eslint-disable-next-line no-undef
  user: process.env.DB_USER,
  // eslint-disable-next-line no-undef
  password: process.env.DB_PASSWORD,
  // eslint-disable-next-line no-undef
  port: process.env.DB_PORT,
  // eslint-disable-next-line no-undef
  host: process.env.DB_HOST,
});
