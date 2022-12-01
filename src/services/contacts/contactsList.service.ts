import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

async function contactsListService(id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user.contacts;
}

export default contactsListService;
