import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as json from "koa-json";
// import * as path from "path";
import * as koaStatic from "koa-static";
// import * as koaSession from "koa-session";
import * as fs from "fs";
import AppRoutes from "./routes";

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3007;

//路由
AppRoutes.forEach((route) => router[route.method](route.path, route.action));

app.use(koaStatic("./app/build/"));

// 中间件
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = fs.createReadStream("./app/build/index.html");
});

app.listen(port);
console.log(`应用启动成功 端口:${port}`);
