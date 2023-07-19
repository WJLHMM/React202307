import { Request, Response, NextFunction } from "express";
import HttpException from "src/exception/HttpException";
import { StatusCodes } from "http-status-codes";

interface Result {
  status?: number;
  sucess: boolean;
  message: string;
  errors?: string;
}

let errorMiddleWare = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let result: Result = {
    status: error.status,
    sucess: false,
    message: error.message,
  };
  if (error.errors && Object.keys(error.errors).length > 0) {
    result.errors = error.errors;
  }
  res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json(result);
};
export default errorMiddleWare;
