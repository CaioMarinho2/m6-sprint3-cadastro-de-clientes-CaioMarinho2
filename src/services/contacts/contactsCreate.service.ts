import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequest } from "../../interfaces/contacts";

async function contactsCreateService({
  name,
  emails,
  phones,
  id,
}: IContactRequest) {
  const contactRepository = AppDataSource.getRepository(Contact);
  const userRepository = AppDataSource.getRepository(User);
  const phonesRespository = AppDataSource.getRepository(Phone);
  const emailsRespository = AppDataSource.getRepository(Email);

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const newContact = new Contact();
  newContact.name = name;
  newContact.user = user!;

  contactRepository.create(newContact);
  await contactRepository.save(newContact);
  await Promise.all(
    phones.map(async (phone) => {
      const newPhone = new Phone();
      newPhone.phone = phone;
      newPhone.contacts = newContact;

      phonesRespository.create(newPhone);
      await phonesRespository.save(newPhone);
    })
  );

  await Promise.all(
    emails.map(async (email) => {
      const newEmail = new Email();
      newEmail.email = email;
      newEmail.contacts = newContact;

      emailsRespository.create(newEmail);
      await emailsRespository.save(newEmail);
    })
  );

  return newContact;
}

export default contactsCreateService;
