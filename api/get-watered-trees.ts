import { json, send } from "micro";
import { Pool, PoolConfig } from "pg";
import { NowRequest, NowResponse } from "@now/node";

// http://apiurl.com/api/get-watered-trees

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
    const { id } = req.query;
    const result = await pool.query(`
      SELECT id
      FROM trees
      WHERE cardinality(watered) > 0;
    `);
    res.setHeader('Access-Control-Allow-Origin', '*')
    send(res, 200, result.rows.map(item => item.id) });
  } catch (error) {
    console.error(error);
    return send(res, 400);
  }
};