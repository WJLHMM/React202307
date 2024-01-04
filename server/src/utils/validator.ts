import validator from "validator";
import { UserDocument } from "src/models/user";

// export interface RegisterInput extends Partial<UserDocument> {}
export interface RegisterInput {
  //注册传入数据结构
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export interface ResultOfRegisterInputValidate {
  errors: RegisterInput;
  valid: boolean;
}
export const validateRegisterInput = (
  username: keyof UserDocument,
  password: keyof UserDocument,
  confirmPassword: keyof UserDocument,
  email: keyof UserDocument
): ResultOfRegisterInputValidate => {
  //此处类型断言强转
  let errors: RegisterInput = {} as RegisterInput;
  if (username === undefined || username.length === 0) {
    errors.username = "用户名不能为空";
  }
  if (password === undefined || password.length === 0) {
    errors.password = "密码不能为空";
  }
  if (confirmPassword === undefined || confirmPassword.length === 0) {
    errors.confirmPassword = "确认密码不能为空";
  }
  if (email === undefined || email.length === 0) {
    errors.email = "邮箱不能为空";
  }
  if (!validator.isEmail(email)) {
    errors.email = "邮箱格式不正确";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "密码同确认密码不相等";
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
