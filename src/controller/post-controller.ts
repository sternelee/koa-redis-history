import * as ioredis from "ioredis";
import * as shortid from "shortid";
// import * as redis from "redis";
// import { promisify } from "util";

// const io = redis.createClient()
// const client = promisify(io).bind(redis);
const redis = new ioredis({
  port: 6379, // Redis port
  host: "localhost", // Redis host
  connectTimeout: 3000
});

export default class PostController {
  static async get(ctx) {
    const { uid = "master" } = ctx.body.request;
    const keys = await redis.keys(uid + "--*");
    const datas = redis.mget(keys);
    ctx.body = datas;
  }
  static async post(ctx) {
    const { uid = "master", val = "" } = ctx.body.request;
    const uuid = await shortid.generate();
    await redis.set(uid + "--" + uuid, val, "EX", 60 * 60);
    ctx.body = "ok";
  }
}
