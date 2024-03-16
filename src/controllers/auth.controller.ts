import { Connection, QueryRunner } from 'typeorm';
import { Controller, Post, Body } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import { AuthDto } from "../dto";
import { UserService } from "../services";
import { compare } from "bcrypt";
import { createToken } from "../middleware";

@Controller("auth")
export class AuthController {
  private queryRunner: QueryRunner;

  constructor(
    private readonly userService: UserService,
    private readonly connection: Connection
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }
  @Post()
  async authUser(@Body() authDto: AuthDto): Promise<any> {
    const { email, password } = authDto;
    const user = await this.userService.getUserByEmail(email);
    await this.queryRunner.connect();
    try {
      await this.queryRunner.query(`SET search_path TO ${user.schemaName}`);
    } catch (error) {
        console.log(error)
      throw error;
    }
    if (!user) {
      return new NotFoundException({
        message: "Something bad happened",
        error: "User NOT FOUND",
      });
    } else if (!compare(user.password, password)) {
      return new NotFoundException({
        message: "Something bad happened",
        error: "Password mismatch",
      });
    }
    const userToken = await createToken(user.id);
    return {
      data: user,
      userToken: userToken,
    };
  }
}
