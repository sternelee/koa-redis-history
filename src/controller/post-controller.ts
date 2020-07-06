import * as ioredis from "ioredis";
import * as shortid from "shortid";

const redis = new ioredis({
  port: 6379, // Redis port
  host: "localhost", // Redis host
  connectTimeout: 3000
});

export default class PostController {
  static async get(ctx) {
    const { uid = "master" } = ctx.request.query;
    const keys = await redis.keys(uid + "--*");
    if (keys.length === 0) return ctx.body = []
    const datas = await redis.mget(keys);
    ctx.body = datas.reverse();
  }
  static async post(ctx) {
    const { uid = "master", val = "" } = ctx.request.body;
    // TODO: 后续支持 3M 以内的图片
    const uuid = await shortid.generate();
    await redis.set(uid + "--" + uuid, val, "EX", 60 * 60 * 6);
    ctx.body = "ok";
  }
}
