import { ConfigModuleOptions } from '@nestjs/config';
import { envValidationSchema as validationSchema } from 'src/schema/env-validation.schema';

export const configModuleConfig: ConfigModuleOptions = {
  envFilePath: ['.env', '.env.example'],
  expandVariables: true,
  isGlobal: true,
  cache: true,
  validationSchema,
};
