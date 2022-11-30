import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/AppError";
import { Phone } from "../../entities/phones.entity";

async function userCreateService({
  name,
  email,
  password,
  phones,
}: IUserRequest) {
  const userRepository = AppDataSource.getRepository(User);
  const phonesRespository = AppDataSource.getRepository(Phone);

  const emailExists = await userRepository.findOne({ where: { email } });

  if (emailExists) {
    throw new AppError("Email already exists", 400);
  }

  if (phones.length === 0) {
    throw new AppError("you need to register at least one phone", 400);
  }

  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.password = bcrypt.hashSync(password, 10);

  userRepository.create(newUser);

  await userRepository.save(newUser);

  phones.map(async (phone) => {
    console.log(phone);
    const newPhone = new Phone();
    newPhone.phone = phone;
    newPhone.user = newUser;

    phonesRespository.create(newPhone);
    await phonesRespository.save(newPhone);
  });

  console.log(newUser);
  return newUser;
}

export default userCreateService;
