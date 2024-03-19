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
    return await this.userRepository.find();
  }

  async findOne(id: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException("User Not Found");
    }
    return user;
  }

  async create(userDto: any): Promise<any> {
    const newUser = this.userRepository.create(userDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: string, userDto: any): Promise<User> {
    const user = await this.findOne(id);
    this.userRepository.merge(user, userDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

    async getUserByEmail(email: any): Promise<User> {
    return await this.userRepository.findOne({where: { email: email }});
  }
}
