import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class pathChanger implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    try {
        
      }
    catch (error) {
        throw error;
      }
  }
}

