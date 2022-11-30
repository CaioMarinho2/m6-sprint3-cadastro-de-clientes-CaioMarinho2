import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { AppError } from "../../errors/AppError";

async function phoneDeleteService(phoneId: string, id: string) {
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
      await phoneRepository.delete(phone.id);
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

      await phoneRepository.delete(phone.id);
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default phoneDeleteService;
