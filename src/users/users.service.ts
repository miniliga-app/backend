import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { hashText } from 'src/utils/hash-text/hash-text';
import { Not } from 'typeorm';
import { UserNotFoundException } from 'src/exceptions/user/user-not-found.exception';
import { EmailTakenException } from 'src/exceptions/user/email-taken.exception';
import { TriedToUpdateNonExistingUserException } from 'src/exceptions/user/tried-to-update-non-existing-user.exception';
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

  async create({
    email,
    password,
    ...rest
  }: CreateUserDto): Promise<UserResponseDto> {
    const isEmailTaken = await this.isEmailTaken(email);
    console.log('IS EMAIL TAKEN: ', isEmailTaken);

    if (isEmailTaken) throw new EmailTakenException();

    const user = new UserEntity();

    Object.assign(user, {
      email,
      password: await hashText(password),
      ...rest,
    });

    return plainToInstance(UserResponseDto, await user.save());
  }

  async findAll(): Promise<UserResponseDto[]> {
    return plainToInstance(UserResponseDto, await UserEntity.find());
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.findOneById(id);
    if (!user) throw new UserNotFoundException();
    return plainToInstance(UserResponseDto, user);
  }

  async update(
    id: string,
    { email, password, ...rest }: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const isEmailTaken = await this.isEmailTaken(email, id);

    if (isEmailTaken) throw new EmailTakenException();

    const user = await this.findOneById(id);

    if (!user) throw new TriedToUpdateNonExistingUserException();

    Object.assign(user, {
      email,
      password: password ? await hashText(password) : user.password,
      ...rest,
    });

    return plainToInstance(UserResponseDto, await user.save());
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) throw new TriedToRemoveNonExistingUserException();
    await user.remove();
  }

  async findOneById(id: string): Promise<UserEntity> {
    return (await UserEntity.findOneBy({ id })) ?? null;
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
}
