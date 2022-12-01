import * as yup from "yup";

const emailsUpdateSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export default emailsUpdateSchema;
