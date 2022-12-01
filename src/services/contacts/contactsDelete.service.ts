import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/AppError";

async function contactsDeleteService(id: string, contact_id: string) {
  const contactRepository = AppDataSource.getRepository(Contact);
  try {
    const contact = await contactRepository.findOne({
      relations: { user: true },
      where: {
        id: contact_id,
      },
    });
    console.log(contact);
    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    if (contact.user.id !== id) {
      throw new AppError("Unauthorized", 401);
    }

    await contactRepository.delete(contact.id);

    return contact;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default contactsDeleteService;
