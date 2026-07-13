import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ApiError from "../errorHelpers/ApiError.js";
import httpStatus from "http-status";

const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        file: (req as any).file,
        files: (req as any).files,
      });
      return next();
    } catch (error: any) {
      if (error?.errors && Array.isArray(error.errors)) {
        // Format the ZodError into a readable message
        const errorMessage = error.errors.map((err: any) => `${err.path?.join('.') || 'Field'}: ${err.message}`).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
      }
      return next(error);
    }
  };
};

export default validateRequest;
