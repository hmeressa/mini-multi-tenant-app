import { Injectable, NestMiddleware } from "@nestjs/common";
import { Connection } from "typeorm";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class PathChanger implements NestMiddleware {
  constructor(private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
        await this.connection.query(
          `SET search_path TO ${req["user"].schemaName}`);
      next();
    } catch (error) {
      next(error);
    }
  }
}
