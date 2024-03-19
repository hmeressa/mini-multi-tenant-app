import { Connection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { getAuthToken } from './getAuthToken.middleware';
import { verifyToken } from './verifyToken.middleware';
import { UserService } from '../services';

@Injectable()
export class Authorization implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = await getAuthToken(req, res, next);
      const verify = await verifyToken(authToken);

      if (!verify) {
        return next(
          new UnauthorizedException({
            message: "Unauthorized",
            error: "Please login",
          })
        );
      }

      const user = await this.userService.findOne(verify.userId);

      if (!user) {
        return next(
          new UnauthorizedException({
            message: "Unauthorized",
            error: "Please login",
          })
        );
      }
      req["user"] = user;
      await this.connection.query(`SET search_path TO ${user.schemaName}`);
      next();
    } catch (error) {
      return next(
        new UnauthorizedException({
          message: "Unauthorized",
          error: "Please login",
        })
      );
    }
  }
}
