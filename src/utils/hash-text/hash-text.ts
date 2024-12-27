import * as crypto from 'crypto';

export const hashText = async (text: string): Promise<string> => {
  const salt = process.env.HASH_SALT!;
  const hash = crypto.createHash('sha3-512');
  hash.update(salt + text);
  return hash.digest('hex');
};
