import { Connection } from 'typeorm';
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class pathChanger implements NestMiddleware {
  constructor(private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.connection.query(`SET search_path TO ${req["user"].schemaName}`);
      next();
    } catch (error) {
      throw error;
    }
  }
}

