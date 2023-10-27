import * as bcrypt from 'bcrypt';

export function comparePass(password: string, hashPassword: string): boolean {
  return bcrypt.compareSync(password, hashPassword);
}

export function hashPass(password: string): string {
  return bcrypt.hashSync(password, process.env.SALT_HASH_BCRYPT);
}
