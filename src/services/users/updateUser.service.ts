import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserupdate } from "../../interfaces/users";
import { hash, compare } from "bcryptjs";

const updateUSerService = async (
  userId: string,
  { name, email, password }: IUserupdate
): Promise<boolean> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  Object.assign(user, { name, email, password });

  await userRepository.update(user.id, user);

  return true;
};
export default updateUSerService;
