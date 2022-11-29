import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.name")
    .addSelect("user.email")
    .addSelect("user.age")
    .addSelect("user.created_at")
    .addSelect("user.updated_at")
    .getMany();

  return users;
};
export default listUsersService;
