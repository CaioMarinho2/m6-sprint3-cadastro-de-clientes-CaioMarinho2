import * as yup from "yup";

const emailsSchema = yup.object().shape({
  emails: yup.array().of(yup.string().email().required()).required(),
});

export default emailsSchema;
