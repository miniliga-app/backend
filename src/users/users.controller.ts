import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  forwardRef,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { parseUuidPipe } from 'src/pipes';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.FOUND)
  async findAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.FOUND)
  async findOneUser(
    @Param('id', parseUuidPipe) id: string,
  ): Promise<UserResponseDto> {
    return this.usersService.findOneUser(id);
  }
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', parseUuidPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', parseUuidPipe) id: string): Promise<void> {
    return this.usersService.removeOneUser(id);
  }
}
