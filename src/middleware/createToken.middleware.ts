import * as jwt from 'jsonwebtoken';

export const createToken = async (userId: string) => {
  return await jwt.sign({ userId }, '12345678910');
};
