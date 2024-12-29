import Joi from 'joi';

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

export const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
  });
  return schema.validate(book);
};

export const validateDiscussion = (data) => {
  const schema = Joi.object({
    book: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    text: Joi.string().min(1).required(),
    dateCommented: Joi.date().default(Date.now)
  });

  return schema.validate(data);
};

export const validateMeeting = (data) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    time: Joi.string().required(),
    location: Joi.string().required(),
    book: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  });

  return schema.validate(data);
};

export const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(6),
    role: Joi.string().valid('admin', 'superadmin'),
    isActive: Joi.boolean()
  }).min(1); 

  return schema.validate(data);
};
