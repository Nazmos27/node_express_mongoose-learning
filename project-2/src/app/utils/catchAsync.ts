import { NextFunction, Request, RequestHandler, Response } from 'express';

//catchAsyc, a higher order function which will reduce repeatation of using tryCatch block
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
