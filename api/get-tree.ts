import { json, send } from "micro";
import { Pool, PoolConfig } from "pg";
import { NowRequest, NowResponse } from "@now/node";

// http://apiurl.com/api/get-tree?id=idhere

const test_id = "_zxffxctnc";

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
    const result = await pool.query(`SELECT * FROM trees WHERE trees.id = $1`, [test_id]);
    send(res, 200, result.rows[0] });
  } catch (error) {
    console.error(error);
    return send(res, 400);
  }
};
