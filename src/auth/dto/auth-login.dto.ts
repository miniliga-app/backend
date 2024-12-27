import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Email of user which tries to login',
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Password of user which tries to login',
  })
  @IsString()
  password: string;
}
