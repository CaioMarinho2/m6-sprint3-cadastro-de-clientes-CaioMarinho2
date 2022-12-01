import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";

async function userListService(id: string) {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  return user;
}

export default userListService;
