import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { AppError } from "../../errors/AppError";
import { IPhonesRequestUpdate } from "../../interfaces/phones";

async function phoneUpdateService({
  phoneId,
  id,
  Newphone,
}: IPhonesRequestUpdate) {
  const contactRepository = AppDataSource.getRepository(Contact);
  const phoneRepository = AppDataSource.getRepository(Phone);

  try {
    const phone = await phoneRepository.findOne({
      relations: { user: true, contacts: true },
      where: {
        id: phoneId,
      },
    });

    if (!phone) {
      throw new AppError("Phone not found", 404);
    }
    if (phone.user) {
      if (phone.user.id !== id) {
        throw new AppError("Unauthorized", 401);
      }
      await phoneRepository.update(phone.id, { phone: Newphone });
      return true;
    }
    if (phone.contacts) {
      const contact = await contactRepository.findOne({
        relations: { user: true },
        where: {
          id: phone.contacts.id,
        },
      });

      if (contact!.user.id !== id) {
        throw new AppError("Unauthorized", 401);
      }

      await phoneRepository.update(phone.id, { phone: Newphone });
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default phoneUpdateService;
