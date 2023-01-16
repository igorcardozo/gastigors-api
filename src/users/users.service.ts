import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Users } from '../database/interfaces/user.model';
import { GetUserDto } from './dto/get-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService<Users>) {
    databaseService.setModel('Users');
  }

  async createUser(data: CreateUserDto) {
    await this.databaseService.create(data);
  }

  async getUser(id: string): Promise<GetUserDto> {
    const user = await this.databaseService.getById(id);
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
    };
  }

  async getUsers(): Promise<GetUserDto[]> {
    return await this.databaseService.getAll();
  }

  async deleteUser(id: string): Promise<DeleteUserDto> {
    const deleted = await this.databaseService.deleteById(id);
    return { deleted };
  }
}
