import Joi from 'joi';

export const userValidationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.base': 'First name should be a type of text',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().required().messages({
    'string.base': 'Last name should be a type of text',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should have a minimum length of 6 characters',
    'any.required': 'Password is required',
  })
});
