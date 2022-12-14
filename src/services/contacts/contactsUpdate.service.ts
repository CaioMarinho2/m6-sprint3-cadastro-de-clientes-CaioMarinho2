import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequestUpdate } from "../../interfaces/contacts";

async function contactsUpdateService({
  id,
  contact_id,
  name,
}: IContactRequestUpdate) {
  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    const contact = await contactRepository.findOne({
      relations: { user: true },
      where: {
        id: contact_id,
      },
    });
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    if (contact.user.id !== id) {
      throw new AppError("Unauthorized", 401);
    }

    await contactRepository.update(contact.id, { name: name });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        throw new AppError(error.message, 401);
      }
      throw new AppError(error.message, 404);
    }
  }
}

export default contactsUpdateService;
