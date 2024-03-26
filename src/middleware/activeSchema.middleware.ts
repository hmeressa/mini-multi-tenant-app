import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Connection } from "typeorm";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class ActiveSchema implements NestMiddleware {
  constructor(private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {console.log(req)
      const tableNameToCheck = "company";
      const queryResult = await this.connection.query(
        `
        SELECT EXISTS (
          SELECT 1
          FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = $1
        ) AS exists;`,
        [tableNameToCheck]
      );
      const tableExists = queryResult[0].exists;

      if (tableExists) {
        await this.connection.query(`SET search_path TO public`);
      } else {
        throw new NotFoundException(`Table '${tableNameToCheck}' does not exist in the public schema`);
      }
      next();
    } catch (error) {
      console.error(error, "message");
      next(error);
    }
  }
  // Helper method to get the current table name from the request path
  private getCurrentTable(req: Request): string {
    const pathSegments = req.route.path.split("/");
    return pathSegments[pathSegments.length - 1];
  }
}
