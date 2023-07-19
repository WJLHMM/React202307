import { Request, Response, NextFunction } from "express";
import { User, UserDocument } from "../models/user";
import { validateRegisterInput } from "../utils/validator";
import HttpException from "../exception/HttpException";
import { StatusCodes } from "http-status-codes";
import { UserPayload } from "src/types/payload";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { username, password, confirmPassword, email, avatar } = req.body;
  try {
    let { valid, errors } = validateRegisterInput(
      username,
      password,
      confirmPassword,
      email
    );
    if (!valid) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "参数校验失败",
        errors
      );
    }
    //校验是否重名
    let existUsers: UserDocument | null = await User.findOne({ username });
    if (existUsers) {
      throw new HttpException(
        StatusCodes.UNPROCESSABLE_ENTITY,
        "用户名重复",
        errors
      );
    }
    let user: UserDocument = new User({
      username,
      password,
      confirmPassword,
      email,
      avatar,
    });
    await user.save();
    res.json({
      status: res.statusCode,
      success: true,
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { username, password } = req.body;
    let oldUserExisted = await User.login(username, password);
    if (oldUserExisted) {
      let access_token = oldUserExisted.getAccessToken();
      res.json({
        status: res.statusCode,
        success: true,
        data: access_token,
      });
    } else {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        "用户名不存在，请重新输入"
      );
    }
  } catch (e) {
    next(e);
  }
};

export const validator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("from frontend");
  let authorization = req.headers.authorization;
  if (authorization) {
    const access_token = authorization.split(" ")[1];
    if (access_token) {
      try {
        const userPayloade: UserPayload = jwt.verify(
          access_token,
          process.env.JWT_SECRET_KEY || "jlWang"
        ) as UserPayload;
        // const user = await User.findById(userPayloade.id).select("username");
        const user = await User.findById(userPayloade.id);
        // console.log("user=", user && user.username);
        if (user) {
          res.json({
            status: res.statusCode,
            success: true,
            // data: `${user._doc.username} 成功验证登录`,
            // data: `${user} 成功验证登录`,
            data: user.toJSON(),
          });
        } else {
          next(new HttpException(StatusCodes.UNAUTHORIZED, "没有此用户"));
        }
        //最后显示结果 可以是下面promise 收集，也可以上面 if 判断
        // User.findById(userPayloade.id).then(
        //   (r) => {
        //     console.log("r =", r);
        //     res.json({
        //       success: true,
        //       data: r && r._doc,
        //     });
        //   },
        //   () => {
        //     next(new HttpException(StatusCodes.UNAUTHORIZED, "没有此用户"));
        //   }
        // );
      } catch (e) {
        next(new HttpException(StatusCodes.UNAUTHORIZED, e.message));
      }
    } else {
      next(new HttpException(StatusCodes.UNAUTHORIZED, "没有access_token"));
    }
  } else {
    next(new HttpException(StatusCodes.UNAUTHORIZED, "您未授权登录"));
  }
};
