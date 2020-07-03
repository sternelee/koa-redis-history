import HomeController from "./controller/home-controller";
import PostController from "./controller/post-controller";

export default [
  {
    path: "/home",
    method: "get",
    action: HomeController.hello,
  },
  {
    path: "/get",
    method: "get",
    action: PostController.get
  },
  {
    path: "/post",
    method: "post",
    action: PostController.post
  }
];
