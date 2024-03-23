import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { UserService } from "../services";
import { UserDto } from "../dto";
import { User } from "../model";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<User> {
    return this.userService.create(userDto);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() userDto: UserDto
  ): Promise<User> {
    return this.userService.update(id, userDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
