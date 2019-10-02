import { APIGatewayProxyHandler } from "aws-lambda";
import { Client } from "pg";

export const hello: APIGatewayProxyHandler = async event => {
  const pgClient = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  await pgClient.connect();
  const res = await pgClient.query('SELECT * FROM "users"');
  console.info("res", res);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event
    })
  };
};
