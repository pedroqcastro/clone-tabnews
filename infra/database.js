import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENVIRONMENT === "development" ? false : true,
  });

  console.log('Credenciais do banco:',{
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENVIRONMENT,
    node_env: process.env.NODE_ENV,
  })

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(`Houve um erro ao tentar realizar a consulta no banco: ${error}`);
    throw error;
  } finally {
    await client.end();
  };
}


export default {
  query: query,
};
 