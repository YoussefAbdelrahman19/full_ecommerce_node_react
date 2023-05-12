import bcrypt from 'bcrypt';

export const hashPassword = async password => {
  try {
    const saltRounds = 10;
    const hashPassword = bcrypt.hash (password, saltRounds);
    return hashPassword;
  } catch (error) {
    console.log ('error hashing password', error);
  }
};

export const comparePassword = async (password, hashPassword) => {
  return bcrypt.compare (password, hashPassword);
};
