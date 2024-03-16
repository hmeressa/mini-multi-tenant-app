import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models";
import { UserRepository } from "../repositories";
import { UserDto } from "src/dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async create(userDto: UserDto): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }

  async update(id: number, userDto: UserDto): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, userDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

    async getUserByEmail(email: any): Promise<UserDto> {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: ["role"],
    });
  }
}
