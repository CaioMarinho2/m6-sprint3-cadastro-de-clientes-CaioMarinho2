import AppDataSource from '../../data-source';
import { AppError } from '../../errors/AppError';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ISessionLogin } from '../../interfaces/session';
import { User } from '../../entities/users.entity';

const userLoginService = async ({ email, password }: ISessionLogin) => {
  const userRepository = AppDataSource.getRepository(User);
  // const user = usersList.find((user) => user.email === email);
  const user = await userRepository
    .createQueryBuilder('users')
    .where('users.email = :email', { email })
    .getOne();

  if (!user) {
    throw new AppError('Invalid email or password', 403);
  }
  
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new AppError('Invalid email or password', 403);
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
    }
  );

  return { token: token };
}
export default userLoginService 
