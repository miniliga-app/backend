import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (_data, context: ExecutionContext) =>
    context.switchToHttp().getRequest().user,
);
