import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

async function userDeleteService(id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const userDelete = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!userDelete) {
    throw new AppError("User not found", 404);
  }

  await userRepository.delete(userDelete!.id);

  return true;
}

export default userDeleteService;
