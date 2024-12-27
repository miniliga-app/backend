import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  DB_PORT: Joi.number().required(),
  DB_HOSTNAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_IS_LOGGING_ENABLED: Joi.boolean().required(),
  DB_IS_SYNCHRONIZING_ENABLED: Joi.boolean().required(),
  JWT_SECRET_KEY: Joi.string().min(20).required(),
  JWT_SIGN_KEY: Joi.string().required(),
  HASH_SALT: Joi.string().required(),
});
