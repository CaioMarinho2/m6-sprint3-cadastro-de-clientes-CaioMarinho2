import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { AppError } from "../../errors/AppError";
import { IEmailRequestUpdate } from "../../interfaces/emails";

async function emailUpdateService({email,email_id,id}:IEmailRequestUpdate) {
    const emailRepository = AppDataSource.getRepository(Email);
  const contactRepository = AppDataSource.getRepository(Contact);

  try {
    const emailFind = await emailRepository.findOne({
      relations: { contacts: true },
      where: {
        id: email_id,
      },
    });

    if (!emailFind ) {
      throw new AppError("Email not found", 404);
    }

    const contact = await contactRepository.findOne({
      relations: { user: true },
      where: {
        id: emailFind.contacts.id,
      },
    });

    if (!contact) {
      throw new AppError("Contact not found", 404);
    }

    if (contact.user.id !== id) {
      throw new AppError("Unauthorized", 401);
    }
    await emailRepository.update(emailFind.id,{email:email});
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default emailUpdateService