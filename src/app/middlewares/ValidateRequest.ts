import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const ValidateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      // validation with Higher Order
      //  if everything all right next()
  
      try {
        await schema.parseAsync({
          body: req.body,
        });
  
        return next();
      } catch (err) {
        next(err);
      }
    };
  };

  export default ValidateRequest ;