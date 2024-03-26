import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../model";
import { UserRepository } from "../repositories";
import { UserDto } from "../dto";

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
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async update(id: any, userDto: UserDto): Promise<any> {
    return await this.userRepository.update(id, userDto );
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

    async getUserByEmail(email: any): Promise<User> {
    return await this.userRepository.findOne({where: { email: email }});
  }

  async updateUserSchema(id: any, schemaName: any) {
    return await this.userRepository.update(id, { schemaName: schemaName });
  }
}
