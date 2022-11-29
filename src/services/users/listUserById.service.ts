import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const listUserByIdService = async (userId: string): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.id = :id", { id: userId })
    .select("user.id")
    .addSelect("user.name")
    .addSelect("user.email")
    .addSelect("user.age")
    .addSelect("user.created_at")
    .addSelect("user.updated_at")
    .getMany();

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return user;
};
export default listUserByIdService;
