import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import bcrypt from "bcrypt";
import { IUserUpdate } from "../../interfaces/users";

async function userUpdateService(
  id: string,
  { name, email, password }: IUserUpdate
) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (email) {
    const userEmailInUse = await userRepository.findOne({
      where: { email: email },
    });
    if (userEmailInUse) {
      throw new AppError("Email already in use", 400);
    }
  }

  if (password) {
    password = bcrypt.hashSync(password, 10);
  }
  const updatedUser = {
    name: name || user.name,
    email: email || user.email,
    password: password || user.password,
  };

  await userRepository.update(user.id, updatedUser);

  return true;
}

export default userUpdateService;
