import { IncomingMessage, ServerResponse } from "http";
import { json, send } from "micro";
import { Pool, PoolConfig } from "pg";
import { NowRequest, NowResponse } from "@now/node";
const pgconfig: PoolConfig = {
  user: process.env.user!,
  database: process.env.database!,
  password: process.env.password!,
  port: parseInt(process.env.port!, 10),
  host: process.env.host!
};
const pool = new Pool(pgconfig);
export default async (req: NowRequest, res: NowResponse) => {
  try {
    const data = await json(req);
    console.info(data);
    const result = await pool.query("SELECT NOW()");
    // await pool.end();

    send(res, 200, { value: result });
  } catch (error) {
    console.error(error);
    return send(res, 400);
  }
};
