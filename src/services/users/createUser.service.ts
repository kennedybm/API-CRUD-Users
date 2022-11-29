import { IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/user.entity";
import { hash } from "bcryptjs";

const createUseService = async ({
  name,
  email,
  password,
  age,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (findUser) {
    throw new AppError("User already registered!");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    age,
  });

  await userRepository.save(user);

  const userResponse = userRepository.create({
    name,
    email,
    age,
  });

  return userResponse;
};
export default createUseService;
