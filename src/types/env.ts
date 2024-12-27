export interface IEnvConfig {
  APP_PORT: number;
  DB_PORT: number;
  DB_HOSTNAME: string;
  DB_USERNAME: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_IS_LOGGING_ENABLED: boolean;
  DB_IS_SYNCHRONIZING_ENABLED: boolean;
  JWT_SECRET_KEY: string;
  JWT_SIGN_KEY: string;
  HASH_SALT: string;
}
