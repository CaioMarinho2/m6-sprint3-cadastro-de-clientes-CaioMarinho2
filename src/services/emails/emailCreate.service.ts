import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { AppError } from "../../errors/AppError";
import { IEmailRequest } from "../../interfaces/emails";

async function emailCreateService({ id, contact_id, emails }: IEmailRequest) {
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(Email);

  try {
    if (emails.length === 0) {
      throw new AppError("you need to register at least one email", 400);
    }

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

    let arrReturn: Array<object> = [];
    emails.map(async (email) => {
      console.log(email);
      const newEmail = new Email();
      newEmail.email = email;
      newEmail.contacts = contact;

      emailRepository.create(newEmail);

      arrReturn.push({ email: newEmail.email, message: "created" });
      await emailRepository.save(newEmail);
    });

    return arrReturn;
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message, 404);
    }
  }
}

export default emailCreateService;
