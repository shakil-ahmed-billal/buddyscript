import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
