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
            /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
          "Phones must be valid and and contain the ddd before the number"
        )
        .required()
        
    )
    
});

export default userSchema ;
