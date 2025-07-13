import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { error } from 'console';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { fullname, email } = createUserDto;
    try {
      const newUser = await this.userModel.create({
        fullname: fullname,
        email: email,
        isActive: true,
      });

      return newUser;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new BadRequestException(`User with ID ${id} not found`);
    }
    return user;
  }

  // MÉTODO FIND ALL

  async findAll() {
    const users = await this.userModel.findAll({
      where: { isActive: true },
      include: [{ model: Game, through: { attributes: [] } }],
    });
  }

  // MÉTODO UPDATE

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await user.update(updateUserDto);
      return user;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  // MÉTODO REMOVE

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await user.destroy();
      return { message: `User with ID ${id} deleted`, user };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  private handleDBException(error: any) {
    if (error?.parent?.code === '23505') {
      throw new BadRequestException(error.parent.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Something went wrong!');
  }
}
