import * as yup from "yup";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  phones: yup
    .array()
    .of(
      yup
        .string()
        .matches(
          /^[1-9]{2} (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/,
          "Phones must be valid and follow the following format: 00 00000-0000"
        )
        .required()
        
    )
    
});

export default userSchema ;
