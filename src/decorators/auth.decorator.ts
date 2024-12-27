import { applyDecorators, Type, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardType } from 'src/types/auth';

const authGuards: Record<AuthGuardType, () => Type<unknown>> = {
  jwt: () => AuthGuard('jwt'),
};

export const Auth = (type: AuthGuardType = 'jwt') => {
  const Guard = authGuards[type];

  if (!Guard) throw new Error(`Unknown auth type: ${type}`);

  return applyDecorators(UseGuards(Guard()));
};
