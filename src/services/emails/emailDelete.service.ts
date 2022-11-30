import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { AppError } from "../../errors/AppError";

async function emailDeleteService(email_id: string, id: string) {
  const emailRepository = AppDataSource.getRepository(Email);
  const contactRepository = AppDataSource.getRepository(Contact);

  try {
    const email = await emailRepository.findOne({
      relations: { contacts: true },
      where: {
        id: email_id,
      },
    });

    if (!email) {
      throw new AppError("Email not found", 404);
    }

    const contact = await contactRepository.findOne({
      relations: { user: true },
      where: {
        id: email.contacts.id,
      },
    });

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    if (contact.user.id !== id) {
      throw new AppError("Unauthorized", 401);
    }
    await emailRepository.delete(email.id);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default emailDeleteService;
