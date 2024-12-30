import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { hashText } from 'src/utils/hash-text/hash-text';
import { Not } from 'typeorm';
import { UserNotFoundException } from 'src/exceptions/user/user-not-found.exception';
import { EmailTakenException } from 'src/exceptions/user/email-taken.exception';
import { TriedToRemoveNonExistingUserException } from 'src/exceptions/user/tried-to-remove-non-existing-user.exception';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  async findOneByToken(token: string): Promise<UserEntity> {
    return (await UserEntity.findOneBy({ currentTokenId: token })) ?? null;
  }

  async createUser({
    email,
    password,
    ...rest
  }: CreateUserDto): Promise<UserResponseDto> {
    const user = new UserEntity();

    Object.assign(user, {
      email,
      password: await hashText(password),
      ...rest,
    });

    return plainToInstance(UserResponseDto, await user.save());
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    return plainToInstance(UserResponseDto, await UserEntity.find());
  }

  async findOneUser(id: string): Promise<UserResponseDto> {
    const user = await this.validateUser(id);
    return plainToInstance(UserResponseDto, user);
  }

  async updateUser(
    id: string,
    { email, password, ...rest }: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const isEmailTaken = await this.isEmailTaken(email, id);
    if (isEmailTaken) throw new EmailTakenException();

    const user = await this.validateUser(id);

    Object.assign(user, {
      email,
      password: password ? await hashText(password) : user.password,
      ...rest,
    });

    return plainToInstance(UserResponseDto, await user.save());
  }

  async removeOneUser(id: string): Promise<void> {
    const result = await UserEntity.delete({ id });
    if (result.affected === 0)
      throw new TriedToRemoveNonExistingUserException();
  }

  async isEmailTaken(email: string): Promise<boolean>;
  async isEmailTaken(email: string, id: string): Promise<boolean>;

  async isEmailTaken(email: string, id?: string): Promise<boolean> {
    return !!(await UserEntity.findOneBy({
      email,
      ...(id && { id: Not(id) }),
    }));
  }

  async updateUserProperties(
    userToUpdate: UserEntity,
    {
      password: newPassword,
      email: newEmail,
      ...restOfNewUser
    }: Partial<UserEntity> | Partial<CreateUserDto>,
  ): Promise<UserEntity> {
    if (newPassword) userToUpdate.password = await hashText(newPassword);

    if (newEmail && (await this.isEmailTaken(newEmail, userToUpdate.id)))
      throw new EmailTakenException();

    Object.assign(userToUpdate, restOfNewUser);

    return await userToUpdate.save();
  }

  async validateUser(id: string): Promise<UserEntity> {
    try {
      return await UserEntity.findOneByOrFail({ id });
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  async findOneById(id: string): Promise<UserEntity> {
    return (await UserEntity.findOneBy({ id })) ?? null;
  }
}
