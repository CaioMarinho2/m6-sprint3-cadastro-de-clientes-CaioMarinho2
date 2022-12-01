import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IPhonesRequest } from "../../interfaces/phones";

async function phoneCreateService({ id, phones, owner_id }: IPhonesRequest) {
  const contactRepository = AppDataSource.getRepository(Contact);
  const phoneRepository = AppDataSource.getRepository(Phone);
  const userRepository = AppDataSource.getRepository(User);

  try {
    if (phones.length === 0) {
      throw new AppError("you need to register at least one email", 400);
    }

    const contact = await contactRepository.findOne({
      relations: { user: true },
      where: {
        id: owner_id,
      },
    });

    const user = await userRepository.findOne({
      where: {
        id: owner_id,
      },
    });

    if (!contact && !user) {
      throw new AppError("Contact or User not found", 404);
    }

    if (contact) {
      if (contact.user.id !== id) {
        throw new AppError("Unauthorized", 401);
      }

      let arrReturn: Array<object> = [];
      phones.map(async (phone) => {
        const newPhone = new Phone();
        newPhone.phone = phone;
        newPhone.contacts = contact;

        phoneRepository.create(newPhone);

        arrReturn.push({ email: newPhone.phone, message: "created" });
        await phoneRepository.save(newPhone);
      });

      return arrReturn;
    }

    if (user) {
      if (user.id !== id) {
        throw new AppError("Unauthorized", 401);
      }

      let arrReturn: Array<object> = [];
      phones.map(async (phone) => {
        const newPhone = new Phone();
        newPhone.phone = phone;
        newPhone.user = user;

        phoneRepository.create(newPhone);

        arrReturn.push({ email: newPhone.phone, message: "created" });
        await phoneRepository.save(newPhone);
      });

      return arrReturn;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default phoneCreateService;
