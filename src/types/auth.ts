interface CreateTokenResult {
  accessToken: string;
  expiresIn?: number;
}

type GenerateTokenResult = string;

type LoginUserResponse = CreateTokenResult;

type LogoutUserResponse = {
  message: string;
};

interface JwtPayload {
  id: string;
}

type AuthGuardType = 'jwt';

export {
  LoginUserResponse,
  LogoutUserResponse,
  JwtPayload,
  CreateTokenResult,
  GenerateTokenResult,
  AuthGuardType,
};
