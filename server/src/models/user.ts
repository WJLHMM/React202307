import mongoose, { Schema, Model, Document } from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/payload";

type IsEmailOptions = /*unresolved*/ any;
export interface UserDocument extends Document {
  username: {
    type: StringConstructor;
    required: [true, string];
    minlength: [number, string];
    maxlength: [number, string];
  };
  password: StringConstructor | Promise<string>;
  email: {
    type: StringConstructor;
    validate: {
      validator: (str: string, options?: IsEmailOptions | undefined) => boolean;
    };
    trim: boolean;
  };
  avatar: StringConstructor;
  confirmPassword: StringConstructor;
  getAccessToken: () => string;
  _doc: UserDocument;
}

const UserSChema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: [true, "用户名不能为空"],
      minlength: [6, "最小长度不能小于6位"],
      maxlength: [12, "最大长度不能小于12位"],
    },
    password: String,
    avatar: String,
    confirmPassword: String,
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
      },
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, result) {
        delete result.id;
        delete result.password;
        delete result.confirmPassword;
      },
    },
  }
);

export interface HookNextFunction {
  (error?: Error): any;
}

//这里类型有问题，暂时使用any
// UserSChema.pre<UserDocument>("save", async function (next: HookNextFunction) {
UserSChema.pre<any>("save", async function (next: HookNextFunction) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  } catch (e) {
    next(e);
  }
});

//给User 扩展静态方法
UserSChema.static(
  "login",
  async function (
    this: any,
    username: string,
    password: string
  ): Promise<UserDocument | null> {
    let user: UserDocument | null = await this.model("User").findOne({
      username,
    });
    if (user) {
      const matched = await bcryptjs.compare(password, (user as any).password);
      if (matched) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
);

interface UserModol<T extends Document> extends Model<T> {
  login: (username: string, password: string) => UserDocument | null;
}

//给User模型的实例扩展getAccessToken方法

// UserSChema.method.getAccessToken = function (this: UserDocument): string {
//   let payload = { id: this._id }; //这是放在jwt token中的值
//   return jwt.sign(payload, process.env.JWT_SECRET_KEY || "jlWang", {
//     expiresIn: "1h",
//   });
// };
UserSChema.method(
  "getAccessToken",
  function getAccessToken(this: UserDocument): string {
    let payload: UserPayload = { id: this._id }; //这是放在jwt token中的值
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || "jlWang", {
      expiresIn: "1h",
    });
  }
);

export const User: UserModol<UserDocument> = mongoose.model<
  UserDocument,
  UserModol<UserDocument>
>("User", UserSChema);

// new User().user;
