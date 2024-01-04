import express, { Express, Request, Response, NextFunction } from "express"; //启动服务
import mongoose from "mongoose"; //连接数据
import cors from "cors"; //跨域
import morgan from "morgan"; //访问日志
import helmet from "helmet"; //安全过滤
import multer from "multer"; //上传头像
import "dotenv/config"; //这个包是用来读取.env 文件 写如process.env.JWT_SECRET_KEY
import path from "path";
import errorMiddleWare from "./middlewares/errorMiddleWare";
import HttpException from "./exception/HttpException";
// import { Slides } from "./models";
import * as userController from "./controllers/user";
import * as slidesController from "./controllers/slides";
import * as lessonsController from "./controllers/lesson";
// import { register } from "./controllers/user";
const storage = multer.diskStorage({
  // 指定上传目录
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb) {
    //cb 第一参数错误对象，第二个文件名
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:8080", // 支持跨域访问的域名
    credentials: true, // 允许跨域带 cookie
  })
);

app.use(morgan("dev"));
app.use(
  helmet({
    // Sets "Cross-Origin-Embedder-Policy: require-corp"
    // crossOriginEmbedderPolicy: true,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: ["*"],
    //     scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
    //   },
    // },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res, _next) => {
  res.json({
    success: true,
    data: "hello world",
  });
});

app.post("/user/register", userController.register);
app.post("/user/login", userController.login);
app.get("/user/validator", userController.validator);
app.post(
  "/user/avatarUpload",
  upload.single("avatar"),
  userController.avatarUpload
);
app.get("/slides/list", slidesController.list);
app.get("/lessons/list", lessonsController.lessonList);
app.get("/lessons/:id", lessonsController.getLesson);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, "没有此路由", {
    errors: "NOT FOUND 404",
  });
  next(error);
});
app.use(errorMiddleWare);

(async function () {
  // await mongoose.set("useNewUrlParser", true);
  // await mongoose.set("useUnifiedTopology", true);
  const MONGODB_URL = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017/p1`; //注意这里要写127.0.0.1，不要localhost，否则链接不上
  await mongoose.connect(MONGODB_URL);
  await slidesController.createInitSlides();
  await lessonsController.createInitLesson();
  const PORT = process.env.PORT || 8001;
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
})();
