import * as yup from "yup";

const contactsUpdateSchema = yup.object().shape({
  name: yup.string().required(),
});

export default contactsUpdateSchema;
